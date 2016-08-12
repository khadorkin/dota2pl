import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const init = () => {
  const pub = redis.createClient();
  const sub = redis.createClient();
  return { pub, sub };
};


export default init;
