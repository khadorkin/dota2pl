/**
 * Created by micha on 16.07.2016.
 */
import socket from 'socket.io';
import passportSocketIo from 'passport.socketio'
import { auth } from '../config';
import cookieParser from 'cookie-parser';


const success = (data, accept) => {
  console.log(`Authorized user over the webSockets connection:`, data.user.userName);
  accept();
}

const fail = (data, message,error,accept) => {
  console.log(`Failed to authorize webSockets conection:`, message)
}


const io = (server, session) => {
  const io = socket(server);

  io.on('disconnect', () => console.log(`Disconnect!`));

  const pubNs = io.of('/public');
  const privNs = io.of('/authorized');
  privNs.use(passportSocketIo.authorize({
    cookieParser: cookieParser,       // the same middleware you registrer in express
    key:          'prodotaSession',       // the name of the cookie where express/connect stores its session_id
    secret:       auth.jwt.secret,    // the session_secret to parse the cookie
    store:        session,        // we NEED to use a sessionstore. no memorystore please
    success:      success,  // *optional* callback on success - read more below
    fail:         fail,     // *optional* callback on fail/error - read more below
  }));



  return {socket: io, pubNs, privNs};
}

export default io;