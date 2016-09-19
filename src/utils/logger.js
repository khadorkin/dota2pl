import debug from 'debug';

export default (namespace) => {
  const ns = `prodota:${namespace}`;
  // const logger = debug(ns);
  // logger.useColors = true;
  // logger('ASD');
  // return logger;

  const log = debug(ns+':log');
  const info = debug(ns+':info');
  const warn = debug(ns+':warn');
  const error = debug(ns+':error');

  const logger = { log, info, warn, error };

  Reflect.ownKeys(logger).map(k => {
    logger[k].useColors = true;
  });
  logger.error.color = 1;

  return logger;

}
