import { Storage } from '@google-cloud/storage';
import { IFile } from '@db/review/ReviewModel';
import { ReadStream } from 'fs';

const keyFilename = './collaboapiserver-b75c289ec7a9.json';
const storage = new Storage({ keyFilename });
const bucketName = 'collabo_image_bucket';

interface IUpload {
  file: IFile;
  id: number;
  review_count?: number;
}

interface IGoogleCloudStorage {
  filePath: string;
  createReadStream(): ReadStream;
}

export const UploadReviewImage = async ({ id, file, review_count }: IUpload) => {
  const { filename, createReadStream } = await file;
  const filePath = `review/${id}/${review_count}/${filename}`;
  return await UploadFile({ filePath, createReadStream });
};

export const UploadProfileImage = async ({ id, file }: IUpload) => {
  const { filename, createReadStream } = await file;
  const filePath = `profile/${id}/${filename}`;
  return await UploadFile({ filePath, createReadStream });
};

const UploadFile = async ({ filePath, createReadStream }: IGoogleCloudStorage) => {
  const fileUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

  return new Promise<string>((resolve, reject) => {
    createReadStream().pipe(
      storage
        .bucket(bucketName)
        .file(filePath)
        .createWriteStream()
        .on('finish', () => {
          storage
            .bucket(bucketName)
            .file(filePath)
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
