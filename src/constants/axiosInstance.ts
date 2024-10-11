import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ErrorResponse } from 'react-router-dom';
import { logout } from 'src/redux/actions/userAction';
import { getGlobalDispatch } from 'src/redux/global';

const AUTH_SERVICE_URL = String(process.env.AUTH_SERVICE_URL)
const COMPANY_SERVICE_URL = String(process.env.COMPANY_SERVICE_URL)
const USER_SERVICE_URL = String(process.env.USER_SERVICE_URL)
const CLOUDINARY = String(process.env.CLOUDINARY)
const JOB_SERVICE_URL = String(process.env.JOB_SERVICE_URL)
const CHAT_SERVICE_URL = String(process.env.CHAT_SERVICE_URL)
const NOTIFICATION_SERVICE_URL = String(process.env.NOTIFICATION_URL)
const API_GATEWAY_URL = String(process.env.API_SERVICE_URL)

const createAxiosInstance = (url: string): AxiosInstance => {
    const instance = axios.create({
        baseURL: url,
        withCredentials: true,
    })

    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        return request;
    });

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError<ErrorResponse>) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
                _retryCount?: number;
            };

            if (!originalRequest) {
                return Promise.reject(error);
            }

            // Set a retry limit
            if (!originalRequest._retryCount) {
                originalRequest._retryCount = 0;
            }

            if (error.response?.status === 401 && originalRequest._retryCount < 2) {
                originalRequest._retryCount += 1;

                await refreshToken();
                return instance(originalRequest);
            }

            return Promise.reject(error);
        }
        // async (error: AxiosError<ErrorResponse>) => {
        //     if (!error.config) {
        //         return Promise.reject(error);
        //     }

        //     const originalRequest = error.config as InternalAxiosRequestConfig & {
        //         _retry?: boolean;
        //     };

        //     if (error.response?.status === 401) {
        //         console.log('--------------- intercepter ------------')
        //         const token = await refreshToken()
        //         console.log('token---------------', token)
        //         return token
        //     }
        //     return instance(originalRequest)
        // },
    );
    return instance;
}

const refreshToken = async () => {
    try {
        const response = await fetch(
            `${AUTH_SERVICE_URL}/refresh`,
            {
                method: 'POST',
                credentials: 'include'
            }
        );
        if (response.status == 401) {
            // window.location.href = '/home'
            Logout()
            return response
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return error
    }
}

function Logout() {
    const dispatch = getGlobalDispatch();
    if (dispatch) {
        dispatch(logout(undefined));
    }
}


export const AXIOS_INSTANCE_GATEWAY = createAxiosInstance(API_GATEWAY_URL)

export const AXIOS_INSTANCE_AUTH = createAxiosInstance(AUTH_SERVICE_URL)
// createAxiosInstance(API_GATEWAY_URL+'auth')



export const AXIOS_INSTANCE_COMPANY = createAxiosInstance(COMPANY_SERVICE_URL)
// createAxiosInstance(API_GATEWAY_URL+'company')



export const AXIOS_INSTANCE_USER =  createAxiosInstance(USER_SERVICE_URL)
// createAxiosInstance(API_GATEWAY_URL+'user')



export const AXIOS_INSTANCE_NOTIFICATION =  createAxiosInstance(NOTIFICATION_SERVICE_URL)
// createAxiosInstance('api')


export const AXIOS_INSTANCE_JOB =  createAxiosInstance(JOB_SERVICE_URL)
// createAxiosInstance(API_GATEWAY_URL+'job')



export const AXIOS_INSTANCE_CHAT = createAxiosInstance(CHAT_SERVICE_URL)
// createAxiosInstance(API_GATEWAY_URL+'chat')


export const CLOUDINARY_INSTANCE = axios.create({
    baseURL: CLOUDINARY,
    withCredentials: false
})

