import { Storage } from '@google-cloud/storage';
import { createReadStream } from 'fs';
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

export const UploadReviewImage = async (file: any) => {
  const { filename, createReadStream } = await file;
  await new Promise<void>((resolve, reject) => {
    createReadStream().pipe(
      storage
        .bucket(bucketName)
        .file(filename)
        .createWriteStream()
        .on('finish', () => {
          storage
            .bucket(bucketName)
            .file(filename)
            .makePublic()
            .then(() => {
              console.log(`upload done!`);
              resolve();
            })
            .catch((e: any) => {
              reject((e: any) => console.log(`exec error : ${e}`));
            });
        }),
    );
  });
};
