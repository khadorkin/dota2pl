import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';

fetch.Promise = Promise;
Response.Promise = Promise;


export default class Stream {
  constructor({ redis, io }) {
    this.pub = redis.pub;
    this.sub = redis.sub;
    this.privNs = io.privNs;
    this.pubNs = io.pubNs;
    this.streams = null;
    this._configureStream();
    this.fetchStreamList();
    const fetchInLoop = setInterval(this.fetchStreamList, 70000);
  }

  _configureStream() {
    // Public channel
    this.pubNs.on('connection', (s) => this._handleJoin(s));
    // Verified channel
    this.privNs.on('connection', (s) => this._handleJoin(s));
    this._configureRedisSubscriber();
  }

  // Arrow function, this is bound to class
  fetchStreamList = async () => {
    try {
      console.log('[Twitch.tv stream list] Requesting stream list');
      // const channels = 'versuta,esl_dota2';
      const channels = null;
      const pasrsedChannelString = channels ? `&channel=${channels}` : '';
      const qwe = await fetch(`https://api.twitch.tv/kraken/streams?stream_type=live&game=Dota+2${pasrsedChannelString}`);
      const formatted = await qwe.json();
      console.log(`[Twitch.tv stream list] Recieved stream list from twitch (active streams: ${formatted.streams.length})`);
      const asd = formatted.streams.map(i => {
        return { name: i.channel.name,
          title: i.channel.display_name,
          viewers: i.viewers,
          url: i.channel.url,
          preview: i.preview.large,
          id: i._id };
      });
      this.streams = asd;
      // console.log(`[Twitch.tv stream list] Publishing redis message`)
      this.pub.publish('stream:list', JSON.stringify(asd));
    } catch (e) {
      console.war(e.message);
    }
  }

  _attachPublicHandlers(s) {
    console.log('[Twitch.tv stream list] Attaching public handlers to the connection!');
    // s.on('chat:getInitial', (m) => this._onConnectExchange(s,m));
    s.on('stream:getInitial', (m) => this._onConnectExchange(s, m));
  }
  _attachUserHandlers(s, user) {
    console.log('[Twitch.tv stream list] Attaching private handlers to the connection!');
    // s.on('chat:message', (s) => this._chatMessageHandler(s,user));
  }
  _handleJoin(s) {
    const { user } = s.request || null;
    this._attachPublicHandlers(s);
    if (user) {
      this._attachUserHandlers(s, user);
    }
  }


  _onConnectExchange(s, user = null) {
    // console.log(`[Chat] Sending content to the user`);
    // Get latest messages.
    this.getStreams(s);

    // Get active users.
    // this._getActiveUsers(s);
  }
  getStreams(s) {
    if (this.streams) {
      s.emit('stream:list', this.streams);
    }
  }

  // Websocket boradcasts
  _configureRedisSubscriber() {
    console.log('[Twitch.tv stream list] ');
    this.sub.subscribe('stream:list');
    // TODO: Refactor this, cause data has been pushed from inside Chat.js


    // this.sub.on('message', (c,m) => {
    //   console.log(`[Subscriber] Got message from publisher on channel [${c}], forwarding to clients...`);
    //   this.pubNs.emit(c,JSON.parse(m));
    //   this.privNs.emit(c,JSON.parse(m));
    // })
  }
}
