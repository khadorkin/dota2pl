import moment from 'moment'
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
      s.on('chat:getInitial', (m) => this._onConnectExchange(s,m));


  }

  _attachUserHandlers(s,user){
      console.log(`Attaching private handlers to the connection!`);
      s.on('chat:message', (s) => this._chatMessageHandler(s,user));
  }

  sanitize(txt) {
    /* istanbul ignore else */
    if(txt.indexOf("<") > -1 /* istanbul ignore next */
      || txt.indexOf(">") > -1) {
      txt = txt.replace(/</g, "&lt").replace(/>/g, "&gt");
    }
    return txt;
  }

  _chatMessageHandler(message, user){
    message = this.sanitize(message);
    const time = new Date().getTime();

    const t = moment.unix(time);
    console.log(`[Chat] (${t.format('h:mm:ss')}) ${user.userName}: ${message}`);
    const str = JSON.stringify({message,time,user: {userName: user.userName, steamId: user.steamId}});
    // Push message to redis
    this.pub.RPUSH('chat:messages', str);

    // Publish message event
    this.pub.publish('chat:message', str);

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
    this.sub.subscribe('chat:message');
    this.sub.on('message', (c,m) => {

      console.log(`[Subscriber] Got message from publisher on channel [${c}], forwarding to clients...`);
      this.pubNs.emit(c,JSON.parse(m));
      this.privNs.emit(c,JSON.parse(m));

    })


  }

  _onConnectExchange(s, user = null) {
      console.log(`Sending content to the user`);
      // Get latest messages.
      this._getInitialMessages(s);

      // Get active users.
      // this._getActiveUsers(s);

  }


  async _getInitialMessages(s) {
    try {
      const messages = await this.pub.lrangeAsync('chat:messages',-49, -1);
      console.log(`Initial messages requested, sending last 50 messages!`);
      const parsedMessages = messages.map(m => JSON.parse(m));
      s.emit('chat:messages', parsedMessages);
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