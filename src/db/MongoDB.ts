import mongoose from 'mongoose';

const db = {
  user: 'admin',
  password: '1q2w3e4r!',
};

const MONGO_URL = `mongodb+srv://${db.user}:${db.password}@cluster0.h8nkg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const MongoDB = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongoDB connected');
    })
    .catch((error) => {
      console.log(`connect fail`);
      console.log(error);
    });
};
