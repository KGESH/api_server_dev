import Crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = 'thisissecretkey!thisissecretkey!';
const IV_LENGTH = 16;

/**
 * 리뷰 파일 접속가능한 url
 * 암호화에 필요한 모듈
 * 추후 작성 예정
 * (21-09-05:지성현)
 */
export const EncryptReviewImageName = () => {
  const iv = Crypto.randomBytes(IV_LENGTH);
  const cipher = Crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
};
