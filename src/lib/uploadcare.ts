import { UploadClient } from "@uploadcare/upload-client";
import { UploadcareSimpleAuthSchema } from "@uploadcare/rest-client";

export const uploadClient = new UploadClient({ 
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string 
});

export const uploadcareAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
  secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY as string
});