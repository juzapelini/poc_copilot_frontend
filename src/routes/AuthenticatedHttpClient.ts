import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class AuthenticatedHttpClient {
    private axiosInstance: AxiosInstance;
    private token: string;

    constructor(token: string) {
        this.token = token;
        this.axiosInstance = axios.create();

        // Intercepta as requisições para adicionar o token de autenticação
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (!config.headers) {
                    config.headers = new axios.AxiosHeaders();
                }
                config.headers['Authorization'] = `Bearer ${this.token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    // Adicione outros métodos HTTP conforme necessário (put, delete, etc.)
}

export default AuthenticatedHttpClient;