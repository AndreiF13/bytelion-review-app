// Simple Axiios wrapper to make requests more simple and straighforward

import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

const apiRequest = function (url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    const onSuccess = function (response: AxiosResponse) {
        return response.data;
    };

    const onError = async function (error: AxiosError) {
        return Promise.reject(error.response || error.message);
    };

    const client = axios.create({
        baseURL: url,
        timeout: 30000,
    });

    return client(options).then(onSuccess).catch(onError);
};

export default apiRequest;
