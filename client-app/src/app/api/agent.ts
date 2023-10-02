import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';
import { Market } from '../models/market';
import { LoginValues, User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { router } from '../router/Route';
import { PaginatedResult } from '../models/pagination';



axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {

    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }

    return response;

}, (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            // if (typeof data === 'string') {
            //     toast.error(data);
            // }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            router.navigate('/not-found');
            break;
        case 401:
            if (status === 401 && headers['www-authenticate'].startsWith('Bearer error="invalid_token"')) {
               
                store.userStore.logout();
                toast.error('Session expired - please login again');
            }

            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {

    list: () => requests.get<Activity[]>('/Activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`activities/${id}`)
}

const Markets = {

    list: () => requests.get<Market[]>('/market'),
    details: (id: string) => requests.get<Market>(`/market/${id}`)

}

const Account = {

    current: () => requests.get<User>('/account'),
    verify: (data: string) => requests.post<User>('/account/login', data),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    login_new: (user: LoginValues) => requests.post<User>('/account/login', user),
    forgotpassword: (user: LoginValues) => requests.post<User>('/account/forgot', user),
    changepassword: (user: LoginValues) => requests.post<User>('/account/changepwd', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    refreshToken: () => requests.post<User>('/account/refreshToken', {})

}

const agent = {
    Activities,
    Account,
    Markets
}

export default agent;
