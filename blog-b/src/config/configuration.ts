import * as process from 'process';

export default () => {
  const env = process.env;
  const isProduction = process.env.NODE_ENV === 'production';
  const tag = isProduction ? '_PROD' : '_DEV';
  console.log("--------Z--------")
  console.log(env['POSUTURUGURESU']);

  console.log('--------PG--------');
  console.log({
    type: 'postgres',
    port: parseInt(env.POSTGRES_PORT, 10) || 5432,
    host: env['POSTGRES_HOST'] || 'localhost',
    username: env['POSTGRES_USERNAME'],
    password: env['POSTGRES_PASSWORD'],
    database: env['POSTGRES_DATABASE'],
    synchronize: false,
  });
  console.log('--------RD--------');
  console.log({
    name: env.REDIS_NAME || 'default',
    port: parseInt(env.REDIS_PORT, 10) || 6379,
    host: env['REDIS_HOST'] || 'localhost',
    password: env['REDIS_PASSWORD'],
    db: env.REDIS_DB || 0,
  });
  return {
    mode: env.NODE_ENV,
    port: parseInt(env.PORT, 10) || 3000,
    server: {
      port: parseInt(env.PORT, 10),
      host: env['URL' + tag],
    },
    swaggerKey: env.SWAGGER_KEY || 'defaultswagger',
    swaggerURL: env.SWAGGER_URL || 'api-docs',
    redis: {
      name: env.REDIS_NAME || 'default',
      port: parseInt(env.REDIS_PORT, 10) || 6379,
      host: env['REDIS_HOST'] || 'localhost',
      password: env['REDIS_PASSWORD'],
      db: env.REDIS_DB || 0,
    },
    postgres: {
      type: 'postgres',
      port: parseInt(env.POSTGRES_PORT, 10) || 5432,
      host: env['POSTGRES_HOST'] || 'localhost',
      username: env['POSTGRES_USER'],
      password: env['POSTGRES_PASSWORD'],
      database: env['POSTGRES_DB'],
      synchronize: false,
    },
  };
};
