/* eslint-disable no-console */
import { ConnectionOptions, createConnection, QueryRunner } from 'typeorm';
import ormconfig from '../../ormconfig';

async function runDBCommand(
  infoMessage: string,
  callback: (queryRunner: QueryRunner) => Promise<void>,
) {
  console.info(' ');
  console.info(infoMessage);

  const conn = await createConnection({
    ...ormconfig,
    schema: 'public',
    migrationsRun: false,
  } as ConnectionOptions);

  try {
    const queryRunner = conn.createQueryRunner();

    await callback(queryRunner);
  } catch (error) {
    console.error(error);
  } finally {
    await conn.close();
  }
}

async function createDatabase() {
  await runDBCommand(
    `>>> Creating database "${process.env.POSTGRES_DB}"...`,
    async (queryRunner: QueryRunner) => {
      await queryRunner.createDatabase(process.env.POSTGRES_DB, true);
    },
  );
}

async function createSchema() {
  await runDBCommand(
    `>>> Creating schema "${process.env.POSTGRES_DB}"."${process.env.POSTGRES_SCHEMA}"`,
    async (queryRunner: QueryRunner) => {
      await queryRunner.createSchema(process.env.POSTGRES_SCHEMA, true);
    },
  );
}

async function createExtensions() {
  await runDBCommand(
    '>>> Creating extensions...',
    async (queryRunner: QueryRunner) => {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    },
  );
}

async function Main() {
  await createDatabase();
  await createSchema();
  await createExtensions();
}

Main();
