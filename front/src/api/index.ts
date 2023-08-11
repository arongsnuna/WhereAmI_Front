import axios, { AxiosRequestConfig } from 'axios';

// axios 인스턴스 생성
const client = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
})

//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const token = localStorage.getItem('accessToken'); // 저장된 토큰을 가져온다
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

export const patchData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
      // Before making the request:
      console.log('URL:', url);
      console.log('Data:', data);

      const token = localStorage.getItem('accessToken'); // 저장된 토큰을 가져온다
      const configWithToken = {
          ...config,
          headers: {
              ...config?.headers, // 기존의 헤더 보존
              Authorization: `Bearer ${token}`, //Auth 헤더 추가
          },
      };

      console.log('Config with Token:', configWithToken); // Logging the config after constructing it

      const response = await client.patch<T>(url, data, configWithToken);

      // After getting the response (before the return):
      console.log('Response:', response);

      return response.data;

  } catch (error: any) {
      // Inside the catch block to ensure you capture all details of the error:
      console.error('Error details:', error);
      if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
      }

      throw new Error(error.message);
  }
}



//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const token = localStorage.getItem('accessToken'); // 저장된 토큰을 가져온다
    const configWithToken = {
      ...config,
      headers: {
        ...config?.headers, // 기존의 헤더 보존
        Authorization: `Bearer ${token}`, //Auth 헤더 추가
      },
    };
    const response = await client.delete<T>(url, configWithToken);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postWithAuth = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const token = localStorage.getItem('accessToken'); // 저장된 토큰을 가져온다
    const configWithToken = {
      ...config,
      headers: {
        ...config?.headers, // 기존의 헤더 보존
        Authorization: `Bearer ${token}`, //Auth 헤더 추가
      },
    };
    const response = await client.post<T>(url, data, configWithToken); // 최신 config 사용
    return response.data;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
