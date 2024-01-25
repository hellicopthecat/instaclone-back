import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { User } from '@prisma/client';
import { IFile } from '../types';

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS + '',
    secretAccessKey: process.env.AWS_SECRET + '',
  },
});
export const uploadS3 = async (file: IFile, user: User, folder: string) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const newFileName = `${folder}/${user.id}/${Date.now()}_${filename}`;
  let response;
  const uploadData = new Upload({
    client: s3,
    params: {
      Bucket: 'inpic-uploads',
      Key: newFileName,
      ACL: 'public-read-write',
      Body: readStream,
    },
  });
  try {
    response = await uploadData.done();
  } catch (err) {
    console.log(err);
  }
  return response?.Location;
};
