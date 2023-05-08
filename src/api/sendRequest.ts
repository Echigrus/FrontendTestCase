import { GlobalConstants } from "@constants/global";
import { RequestResult } from "./responseModels/requestResult";
import axios from "axios";
import { ApiBase } from "./apiBase";

async function sendRequest<T>(url: string, formData: FormData | object): Promise<RequestResult<T>> {
    const config = {
        headers: {
            Accept: 'application/json'
        },
    };
    const fullUrl = `${GlobalConstants.BaseUrl}${url}`;
    let result = new RequestResult<T>();
    try {
        const response = await axios.post<T>(fullUrl, formData, config);
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

export { sendRequest };