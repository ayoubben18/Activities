import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";


axios.defaults.baseURL = 'http://localhost:5001/api';

const responseBody = <T> (response:AxiosResponse<T>) => response.data;

const requests = {
    get:<T> (url:string) => axios.get(url).then(responseBody),
    post:<T> (url:string, body:{}) => axios.post(url, body).then(responseBody),
    put: <T>(url:string, body:{}) => axios.put(url, body).then(responseBody),
    delete:<T> (url:string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list : ()=> requests.get<Activity[]>('/activities'),
    details : (id:string)=> requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post<void>("/activities",activity),
    update:(activity:Activity)=>requests.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string)=>requests.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;