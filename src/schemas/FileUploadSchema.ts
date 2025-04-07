import { z } from "zod";

export const FileUploadSchema = z.object({
    file: z.instanceof(FileList)
    .refine((files) => files[0].type.startsWith('video/'), {
      message: 'The file must be a video',
    }),
    stream_key: z.string(),
});
