import { server } from '../server';
import { KakaoTokenCallback, KakaoCallback } from '@auth/kakao/KakaoCallback';

server.express.get('/auth/kakao/hello', (req, res) => {
  console.log('get hello');
  res.send('hello world!');
});
server.express.get('/auth/kakao/KakaoTokenCallback', KakaoTokenCallback);
server.express.get('/auth/kakao/KakaoCallback', KakaoCallback);
