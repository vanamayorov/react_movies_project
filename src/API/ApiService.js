import { API_URL, API_KEY_3, fetchApi } from '../config/config';
import queryString from 'query-string';

export default class ApiService {
    static get(url, options = {}) {
        const { params = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    static post(url, options = {}) {
        const { params = {}, body = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
}