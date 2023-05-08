import axios, { AxiosInstance } from "axios";
import { RequestResult } from "./responseModels/requestResult";

class ApiBase {
    protected _httpClient: AxiosInstance;
    protected _token?: string;

    constructor(url: string, token?: string) {
        this._httpClient = axios.create({
            baseURL: url,
        });
        this._httpClient.defaults.headers.common['Content-Type'] = 'text/plain';
        if (token) {
            this._token = token;
            this._httpClient.defaults.headers.common['Authorization'] = 'Token ' + this._token;
        }
    }

    /**
     * Отправка GET запроса
     * @param method Метод для запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    protected async get<T>(method: string, params?: any): Promise<RequestResult<T>> {
        let result = new RequestResult<T>();
        try {
            const response = await this._httpClient.get<T>(method, { params: params });
            result.statusCode = response.status;
            if (response.status >= 200 && response.status <= 300) {
                result.data = response.data;
            } else {
                result = ApiBase.parseErrors<T>(response.status, response.data);
            }
        } catch (error) {
            result = ApiBase.parseErrors<T>(error.response.status, error.response.data);
        }
        return result;
    }

    /**
     * Отправка POST запроса
     * @param method Метод для запроса
     * @param data Параметры для тела запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    protected async post<T>(method: string, data?: any, params?: any): Promise<RequestResult<T>> {
        let result = new RequestResult<T>();
        try {
            const response = await this._httpClient.post<T>(method, data, { params: params });
            result.statusCode = response.status;
            if (response.status >= 200 && response.status <= 300) {
                result.data = response.data;
            } else {
                result = ApiBase.parseErrors<T>(response.status, response.data);
            }
        } catch (error) {
            result = ApiBase.parseErrors<T>(error.response.status, error.response.data);
        }
        return result;
    }

    /**
     * Отправка DELETE запроса
     * @param method Метод для запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    protected async delete<T>(method: string, params?: any): Promise<RequestResult<T>> {
        let result = new RequestResult<T>();
        try {
            const response = await this._httpClient.delete<T>(method, { params: params });
            result.statusCode = response.status;
            if (response.status >= 200 && response.status <= 300) {
                result.data = response.data;
            } else {
                result = ApiBase.parseErrors<T>(response.status, response.data);
            }
        } catch (error) {
            result = ApiBase.parseErrors<T>(error.response.status, error.response.data);
        }
        return result;
    }
    
    /**
     * Парсинг ошибок
     * @param data Тело
     * @returns Расшифровка
     */
    public static parseErrors<T>(statusCode: number, data: any): RequestResult<T> {
        if(Object.keys(data).includes("exception")) {
            return {
                statusCode: statusCode, 
                errorCode: data?.errorCode,
                errorMessages: ["Ошибка сервера"],
            };
        }
        else if (Object.keys(data).includes("errors")) {
            return {
                statusCode: statusCode,
                errorCode: data?.errorCode,
                errorMessages: Object.values(data?.errors)
            };
        }
        else {
            return {
                statusCode: statusCode,
                errorCode: data?.errorCode,
                errorMessages: [data?.errorCode]
            };
        }
    }
}

export { ApiBase };