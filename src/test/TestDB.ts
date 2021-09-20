import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let TestDB: MongoMemoryServer;

export const ConnectTestDB = async () => {
  TestDB = await MongoMemoryServer.create();
  const uri = TestDB.getUri();
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, options);
};

export const DisConnectTestDB = async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await TestDB.stop();
};

export const ClearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
