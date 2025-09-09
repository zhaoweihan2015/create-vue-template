// src/utils/request.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

export const request = axios.create({
  timeout: 30000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 未授权
    if (error.status === 401) {
      router.push('/login');
    }

    ElMessage.error('接口请求失败');
    return Promise.reject(error);
  },
);

export const customRequest = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T, any>> => {
  const source = axios.CancelToken.source();

  const promise = await request({
    ...config,
    ...options,
    cancelToken: source.token,
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('请求被取消');
  };

  return promise.data;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

export default customRequest;
