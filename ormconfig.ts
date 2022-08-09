/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');

const jestUtils = require('./jest.utils');

const srcPath = path.resolve(__dirname, 'src');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const ormconfig: any = {
  cli: {
    migrationsDir: path.join('src', 'data', 'migrations'),
  },
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  host: process.env.POSTGRES_HOST,
  logging: process.env.POSTGRES_DEBUG === 'TRUE',
  migrationsTableName: 'database_migrations',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  subscribers: [path.resolve(srcPath, '**', '*.subscriber.ts')],
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  migrationsRun: false, // process.env.NODE_ENV !== 'test',
  migrations: jestUtils.importFilesByRegex(
    `(\.js|\.ts)(?<!\.d\.ts)$`,
    path.resolve(srcPath, 'data', 'migrations'),
  ),
  entities: jestUtils.importFilesByRegex(`\.entity(\.js|\.ts)$`, srcPath),
};
export default ormconfig;
