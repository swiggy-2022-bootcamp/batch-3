export interface  IErrorResponse {
  status: number,
  statusCode: number,
  error?: string,
  message: string,
  description?: string,
  payload?: any
}


export interface ICacheOptions{
  key?: any
}
