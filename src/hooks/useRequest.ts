import Axios, { AxiosRequestConfig, Method } from 'axios'

export const useRequest = async <R extends object, B extends object = object>({
  method,
  url,
  data,
  config,
}: {
  method: Method
  url: string
  data?: B
  config?: AxiosRequestConfig
}) => {
  const res = await Axios.request<R>({
    method,
    url,
    data,
    baseURL: import.meta.env.VITE_API_BASE_URL,
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 422
    },
    headers: {},
    withCredentials: true,
    ...config,
  })

  if (res.status === 422) {
    let message = ''

    if ('statusText' in res) {
      message = res.statusText
    } else if ('message' in res) {
      message = res['message']
    }
    if ('data' in res && 'message' in res['data']) {
      message = res['data']['message'] as string
    }
    const status = 422
    const errorData = { message, status }
    //for gps 批量上傳
    if ('data' in res && 'errors' in res.data) {
      // errorData.errors = JSON.parse(JSON.stringify(res.data)).errors
      // const errorKey = Object.keys(errorData.errors)[0]
      // errorData.message = JSON.parse(JSON.stringify(res.data)).errors[
      //   errorKey
      // ][0]
    }
    throw errorData
  }

  // if (res.data.success === false) {
  //   console.log(res.data);
  //   throw Error(res.data?.message || "错误发生");
  // }
  return res.data
}

export default useRequest
