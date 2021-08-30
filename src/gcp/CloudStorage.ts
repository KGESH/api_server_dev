import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';

const keyFilename = './collaboapiserver-b75c289ec7a9.json';
const storage = new Storage({ keyFilename });
const bucketName = 'collabo_image_bucket';
const testFileUrl = 'cool-doge.gif';

export const CloudStorage = async () => {
  const res = await storage.bucket(bucketName).upload(testFileUrl);

  await storage.bucket(bucketName).file(testFileUrl).makePublic();
  console.log('done');
};
