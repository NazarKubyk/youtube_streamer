"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploadSchema } from "@/schemas/FileUploadSchema";
import { useUploadFileMutation } from "@/api/mutations";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./ui/VisuallyHiddenInput";

interface IUploadFileForm {
    file: FileList;
    stream_key: string;
}

const UploadFileForm = () => {
    const { mutate: upload, isPending, error, isSuccess, data } = useUploadFileMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IUploadFileForm>({ resolver: zodResolver(FileUploadSchema) });

    const onSubmit = async (data: IUploadFileForm) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("stream_key", data.stream_key);

        upload(formData);
    };

    return (
        <Paper sx={{ padding: "12px" }} elevation={3}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}
            >
                <TextField
                    id="stream_key"
                    type="text"
                    label="Stream key"
                    variant="outlined"
                    error={!!errors.stream_key}
                    helperText={errors.stream_key?.message}
                    {...register("stream_key")}
                />

                <Stack>
                    <Typography>Video:</Typography>
                    <Typography>
                        {watch("file") && watch("file").length > 0
                            ? watch("file")[0].name
                            : "No file selected"}
                    </Typography>
                </Stack>

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput id="file" type="file" {...register("file")} />
                </Button>
                
                {!!errors.file && (
                    <Typography style={{ color: "red" }}>{errors.file.message}</Typography>
                )}
                <Button variant="outlined" type="submit" disabled={isSubmitting || isPending}>
                    {isSubmitting || isPending ? "Uploading..." : "Upload"}
                </Button>
                {(isSuccess || data || error) && (
                    <Stack>
                        {isSuccess && (
                            <Typography style={{ color: "green" }}>
                                File uploaded successfully
                            </Typography>
                        )}
                        {data && <Typography style={{ color: "green" }}>{data.message}</Typography>}
                        {error && (
                            <Typography style={{ color: "red" }}>
                                {error.response?.data?.message || "Upload failed"}
                            </Typography>
                        )}
                    </Stack>
                )}
            </form>
        </Paper>
    );
};

export default UploadFileForm;
