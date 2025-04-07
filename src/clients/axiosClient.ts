import { envConfig } from "@/configs/envConfig";
import axios from "axios";

export const axiosClient = axios.create({
    baseURL: envConfig.baseUrl,
});
