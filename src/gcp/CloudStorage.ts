import { Storage } from '@google-cloud/storage';
import { IFile } from '@db/review/ReviewModel';
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
  console.log(`call upload promise`);
  const { filename, createReadStream } = await file;
  await new Promise<void>((resolve, reject) => {
    console.log(`promise in : ${filename}`);
    createReadStream().pipe(
      storage
        .bucket(bucketName)
        .file(`review/${filename}`)
        .createWriteStream()
        .on('finish', () => {
          storage
            .bucket(bucketName)
            .file(`review/${filename}`)
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
