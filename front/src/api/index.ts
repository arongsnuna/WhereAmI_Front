import axios, { AxiosRequestConfig } from 'axios'
import { APIResponse }   from '../interface/response'

// axios 인스턴스 생성
const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.post<{ data: T }>(url, data, config);
    return response.data.data; // Access the nested 'data' property here
  } catch (error: any) {
    throw new Error(error.message);
  }
};


//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
