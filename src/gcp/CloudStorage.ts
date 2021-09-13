import { Storage } from '@google-cloud/storage';
import { IFile } from '@db/review/ReviewModel';

const keyFilename = './collaboapiserver-b75c289ec7a9.json';
const storage = new Storage({ keyFilename });
const bucketName = 'collabo_image_bucket';

export const UploadReviewImage = async (file: Promise<IFile>, id: number, review_count: number) => {
  const { filename, createReadStream } = await file;

  /** will encryption */
  const rawFileName = `review/${id}/${review_count}/${filename}`;
  console.log(`call upload review img`);

  return new Promise<string>((resolve, reject) => {
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
