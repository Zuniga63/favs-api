/* eslint-disable no-console */
import mongoose from 'mongoose';

// eslint-disable-next-line import/no-mutable-exports
export let connection: mongoose.Connection;

const connectionSussessFully = (uri?: string): void => {
  const database: string = connection.db.databaseName;
  console.group('Connection with mongoose to mongoDB');
  console.log(`Uri: ${uri}`);
  console.log(`Database: ${database}`);
  console.groupEnd();
};

export async function connect(): Promise<void> {
  const host: string | undefined = process.env.DB_HOST;
  const port: string | undefined = process.env.DB_PORT;
  const db: string | undefined = process.env.DB_DATABASE;
  const mongoUri = `${host}:${port}/${db}`;

  // Se habilitan las variables virtuales
  mongoose.set('toJSON', { virtuals: true });
  mongoose.set('toObject', { virtuals: true });

  if (connection) {
    connectionSussessFully(mongoUri);
    return;
  }

  await mongoose.connect(mongoUri);
  connection = mongoose.connection;
  connectionSussessFully(mongoUri);

  connection.once('connected', () => {
    console.log('connection to mongoDB is ok');
  });

  connection.on('error', (error) => {
    console.log('Something went wrong!', error);
  });
}

export async function disconect(): Promise<void> {
  if (!connection) return;

  await mongoose.disconnect();
}

export async function cleanup() {
  const deletes: Promise<any>[] = [];
  const { collections } = connection;

  // eslint-disable-next-line no-restricted-syntax
  for (const index in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, index)) {
      const collection = collections[index];
      deletes.push(collection.deleteMany({}));
    }
  }

  await Promise.all(deletes);
}

export default { connect, disconect, cleanup };
