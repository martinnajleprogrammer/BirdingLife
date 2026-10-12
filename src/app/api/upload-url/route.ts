// src/app/api/upload-url/route.ts — esto corre en el SERVIDOR, nunca en el cliente
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ALLOWED_TYPES, MAX_FILE_SIZE_BYTES } from '@/lib/upload-config';

type UploadUrlRequest = {
  contentType: string;
  fileName: string;
  contentLength: number;
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {

    try {
      const body: UploadUrlRequest = await request.json();
      const { contentType, fileName, contentLength } = body;

      if (!ALLOWED_TYPES.includes(contentType)) {
        return Response.json(
          { error: `Filetype not allowed: ${contentType}` },
          { status: 400 }
        );
      }

      if (contentLength > MAX_FILE_SIZE_BYTES) {
        return Response.json(
          { error: `File too large: ${contentLength} bytes (max ${MAX_FILE_SIZE_BYTES})` },
          { status: 400 }
        );
      }

      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const key = `species-photos/${crypto.randomUUID()}-${sanitizedFileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
        ContentLength: contentLength,
      });

      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

      return Response.json({ uploadUrl, key });

    } catch (error) {
      console.error(error);
      return Response.json({ error: 'We could not generate the upload url' }, { status: 500 });
    }
  }


