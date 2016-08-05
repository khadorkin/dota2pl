import {SEND_MESSAGE_SOCKET, DELETE_MESSAGE_REQUEST, DELETE_MESSAGE, PUSH_MESSAGE, SEED_CHAT, TIMEOUT_REQUEST, BAN_REQUEST} from '../../constants'
import moment from 'moment'
import uuid from 'node-uuid';


const TIMEOUT_TIME = 200;

const CHATROOM = 'CHATROOM';
const TIMEOUT = 'TIMEOUT';
const MESSAGE = 'MESSAGE';
const BAN = 'BAN';

export default class Chat {
  constructor({redis, io}) {
    this.pub = redis.pub;
    this.sub = redis.sub;
    this.privNs = io.privNs;
    this.pubNs = io.pubNs;
    this._configureChat();
  }

  _configureChat() {
    // Public channel
    this.pubNs.on('connection', (s) => this._handleJoin(s));
    // Verified channel
    this.privNs.on('connection', (s) => this._handleJoin(s))

    this._configureRedisSubscriber();
  }

  _attachPublicHandlers(s){
      console.log(`Attaching public handlers to the connection!`);
      s.on(SEED_CHAT, (m) => this._onConnectExchange(s,m));



  }

  _attachUserHandlers(s,user){
      console.log(`Attaching private handlers to the connection!`);

      s.on(SEND_MESSAGE_SOCKET, (m) => this.addMessage(m,user));

      s.on(DELETE_MESSAGE_REQUEST, (m) => this.deleteMessages(m,user));
      s.on(BAN_REQUEST, (m) => this.banUser(m,user));

      s.on(TIMEOUT_REQUEST, (m) => this.timeoutUser(m,user));



  }

  async timeoutUser(steamId, user) {
    if(!user.admin) return;
    const roomId = 1;
    // Creates new auto-expiring value, cannot submit message if timed out.
    this.pub.setex(`${TIMEOUT}:${steamId}`, TIMEOUT_TIME, steamId);
    const channel = `${CHATROOM}:${roomId}`;
    // Get all users messages and delete them.
    console.log
    const messages = await this.getMessagesFromRedis(channel, 0);
    const messagesOfTimedOutUser = messages.filter(m => m.steamId === steamId).map(m => m.id);
    this.deleteMessages(messagesOfTimedOutUser, user);
  }


  async banUser(steamId, user) {
    if(!user.admin) return;
    const roomId = 1;
    // Creates new auto-expiring value, cannot submit message if timed out.
    const channel = `${CHATROOM}:${roomId}`;
    this.pub.sadd(`${BAN}:${channel}`, steamId);
    // Get all users messages and delete them.
    const messages = await this.getMessagesFromRedis(channel, 0);
    const messagesOfTimedOutUser = messages.filter(m => m.steamId === steamId).map(m => m.id);
    this.deleteMessages(messagesOfTimedOutUser, user);
  }


  sanitize(txt) {
    /* istanbul ignore else */
    if(txt.indexOf("<") > -1 /* istanbul ignore next */
      || txt.indexOf(">") > -1) {
      txt = txt.replace(/</g, "&lt").replace(/>/g, "&gt");
    }
    return txt;
  }

  deleteMessages(messages, user) {
    if(!user.admin) return; // only admins can delete messages
    if(typeof messages === 'string') {
      messages = [messages];
    }
    const channelId = 1;
    const key = `${CHATROOM}:${channelId}`;

    const removedMessages = messages.filter((messageId) => {
      const message = `${MESSAGE}:${messageId}`;
      // console.log(`Trying to remove ${message} from ${key}`);
      const resultFromList = this.pub.lrem(key, 1, message);
      const resultFromHash = this.pub.del(message);
      return resultFromList && resultFromHash;
    });
    console.log(`[Chat] Removed ${removedMessages.length} message${removedMessages.length > 1 ? 's' : ''}.`);
    this.pub.publish(DELETE_MESSAGE, JSON.stringify(removedMessages));

  }


  // deleteMessage(messageId, user) {
  //   if(!user.admin) return; // only admins can delete messages
  //   const channelId = 1;
  //   const key = `${CHATROOM}:${channelId}`;
  //   const message = `${MESSAGE}:${messageId}`;
  //   console.log(`Trying to remove ${message} from ${key}`);
  //   const resultFromList = this.pub.lrem(key, 1, message);
  //   const resultFromHash = this.pub.del(message);
  //   this.pub.publish(DELETE_MESSAGE, JSON.stringify(messageId));
  // }

  async addMessage(message, user){
    const roomId = 1;
    const key = `${CHATROOM}:${roomId}`;


    const isTimedOut = await this.pub.existsAsync(`${TIMEOUT}:${user.steamId}`);
    // console.log(`${BAN}:${key}`, user.steamId);
    const isBanned = await this.pub.sismemberAsync(`${BAN}:${key}`,user.steamId);
    // TODO: post notification
    if(isBanned) return;
    if(isTimedOut) return;

    message = this.sanitize(message);
    const time = new Date().getTime();

    const t = moment.unix(time);
    console.log(`[Chat] (${t.format('h:mm:ss')}) ${user.userName}: ${message}`);
    const generatedId = uuid.v1();

    const flatMessageObject = {message,time, userName: user.userName, steamId: user.steamId, id: generatedId};


    const str = JSON.stringify(flatMessageObject);
    // Push message to redis
    const messageInList = `${MESSAGE}:${generatedId}`;
    this.pub.hmset(messageInList, flatMessageObject);
    this.pub.rpush(key,messageInList);
    this.pub.ltrim(key, -200, -1);

    this.pub.publish(PUSH_MESSAGE, str);

  }

  _handleJoin(s){
    const {user} = s.request || null;
    s.on('disconnect', () => this._handlePart(user));

    this._attachPublicHandlers(s);
    if(user){
      this._attachUserHandlers(s, user);
      console.log(`[Chat] ${s.request.user.userName} has joined the chatroom.`);
      this.privNs.emit(`chat:join`, {userName: user.userName, steamId: user.steamId});
      this.pubNs.emit(`chat:join`, {userName: user.userName, steamId: user.steamId});
    } else {
      console.log(`[Chat] A guest has joined the chatroom.`);
    }

    // this._onConnectExchange(s ,user);

  }


  _handlePart(user){
    // console.log(`Handling disconnect`);
    // const {user} = s.request;
    if(user) {
      console.log(`[Chat] ${user.userName} has left the chatroom (DISCONNECT).`);
      this.privNs.emit(`chat:leave`, {userName: user.userName, steamId: user.steamId});
      this.pubNs.emit(`chat:leave`, {userName: user.userName, steamId: user.steamId});
    } else {
      console.log(`[Chat] A guest has left the chatroom (DISCONNECT).`);
    }
  }

  _configureRedisSubscriber() {
    this.sub.subscribe(PUSH_MESSAGE);
    this.sub.subscribe(DELETE_MESSAGE);
    this.sub.on('message', (c,m) => {
      console.log(`[Subscriber] Got message from publisher on channel [${c}], forwarding to clients...`);
      this.pubNs.emit(c,JSON.parse(m));
      this.privNs.emit(c,JSON.parse(m));

    })


  }

  _onConnectExchange(s, user = null) {
      // console.log(`[Chat] Sending content to the user`);
      // Get latest messages.
      this._getInitialMessages(s);



      // Get active users.
      // this._getActiveUsers(s);

  }


  async getMessagesFromRedis(channel, amount) {
    const chatMessages =  await this.pub.lrangeAsync(channel,amount, -1);
    const promises = chatMessages.map(async (m) => this.pub.hgetallAsync(m));
    return await Promise.all(promises);
  }

  async _getInitialMessages(s) {
    try {
      // TODO: get channelId from socket channel
      const roomId = 1;
      const numberOfMessages = -50;
      const channel = `${CHATROOM}:${roomId}`;
      const results = await this.getMessagesFromRedis(channel, numberOfMessages);
      // const chatMessages =  await this.pub.lrangeAsync(`${CHATROOM}:${roomId}`,-50, -1);
      // const promises = chatMessages.map(async (m) => this.pub.hgetallAsync(m));
      // const results = await Promise.all(promises);
      s.emit(SEED_CHAT, results);
    } catch (e) {
      console.error(e);
    }


  }

  async _getActiveUsers(s) {
    try {
      const users = await this.pub.lrangeAsync('chat:messages',-49, -1);
      s.emit('chat:users', users);
    } catch (e) {
      console.error(e);
    }
  }
}