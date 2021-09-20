import mongoose from 'mongoose';

// DB admin
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
      useCreateIndex: true,
    })
    .then(() => {
      console.log('mongoDB 연결🌿 DataBase: https://www.mongodb.com/');
    })
    .catch((error) => {
      console.log(`connect fail`);
      console.log(error);
    });
  mongoose.set('debug', true); // 몽구스 디버그 툴
};
