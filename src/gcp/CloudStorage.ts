import { Storage } from '@google-cloud/storage';
import { IFile } from '@db/review/ReviewModel';
import { IUser } from '@src/db/user/UserModel';

const keyFilename = './collaboapiserver-b75c289ec7a9.json';
const storage = new Storage({ keyFilename });
const bucketName = 'collabo_image_bucket';

export const UploadReviewImage = async (file: Promise<IFile>, id: number, review_count: number) => {
  console.log(`call upload promise`);
  const { filename, createReadStream } = await file;

  /** will encryption */
  const rawFileName = `review/${id}/${review_count}/${filename}`;

  return new Promise<string>((resolve, reject) => {
    console.log(`promise in : ${filename}`);

    createReadStream().pipe(
      storage
        .bucket(bucketName)
        .file(rawFileName)
        .createWriteStream()
        .on('finish', () => {
          storage
            .bucket(bucketName)
            .file(rawFileName)
            .makePublic()
            .then(() => {
              console.log(`upload done!`);
              resolve(`https://storage.googleapis.com/${bucketName}/${rawFileName}`);
            })
            .catch((e: any) => {
              reject((e: any) =>
                console.log(`Review Image Google Cloud Storage Upload Error!: ${e}`),
              );
              throw new Error(e);
            });
        }),
    );
  });
};
