import { Storage } from '@google-cloud/storage';
import { IFile } from '@db/review/ReviewModel';

const keyFilename = './collaboapiserver-b75c289ec7a9.json';
const storage = new Storage({ keyFilename });
const bucketName = 'collabo_image_bucket';

interface IUpload {
  file: Promise<IFile>;
  id?: number;
  upload_path?: string;
  review_count?: number;
}

export const UploadReviewImage = async ({ file, id, review_count }: IUpload) =>
  await UploadFile({ file, id, upload_path: `review/${id}/${review_count}` });

export const UploadProfileImage = async ({ file, id }: IUpload) =>
  await UploadFile({ file, upload_path: `profile/${id}` });

const UploadFile = async ({ file, upload_path }: IUpload) => {
  const { filename, createReadStream } = await file;
  const rawFileName = `${upload_path}/${filename}`;
  const fileUrl = `https://storage.googleapis.com/${bucketName}/${rawFileName}`;

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
              resolve(fileUrl);
            })
            .catch((e: any) => {
              reject((e: any) => console.log(`Google Cloud Storage Upload Error!: ${e}`));
              throw new Error(e);
            });
        }),
    );
  });
};
