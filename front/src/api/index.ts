import axios, { AxiosRequestConfig } from 'axios';

// axios 인스턴스 생성
const client = axios.create({
  baseURL: 'http://kdt-ai7-team07.elicecoding.com:3000/',
  withCredentials: true,
})

//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const token = localStorage.getItem('user'); // 저장된 토큰을 가져온다
    const configWithToken = {
      ...config,
      headers: {
        ...config?.headers, // 기존의 헤더 보존
        Authorization: `Bearer ${token}`, //Auth 헤더 추가
      },
    };
    const response = await client.get<T>(url, configWithToken); // 최신 config 사용
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.post<T>(url, data, config);
    return response.data;

  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.put<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.delete<T>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
