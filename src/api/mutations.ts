import { axiosClient } from "@/clients/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUploadFileMutation = () => {
    return useMutation({
        mutationKey: ["uploadFile"],
        mutationFn: async (data: FormData) => {
            const res = await axiosClient.post("/launch_stream", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data;
        },
        onError: (error: AxiosError<{ message: string }>) => error,
    });
};
