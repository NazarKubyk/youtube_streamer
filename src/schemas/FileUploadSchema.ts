import { z } from "zod";

export const FileUploadSchema = z.object({
    file: z
        .any()
        .refine(
            (files) =>
                typeof window !== "undefined" &&
                files instanceof FileList &&
                files.length > 0 &&
                files[0].type.startsWith("video/"),
            {
                message: "The file must be a video",
            }
        ),
    stream_key: z.string(),
});