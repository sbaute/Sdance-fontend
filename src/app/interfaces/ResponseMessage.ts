export interface ResponseMessage<T> {
  message: string;
  action: string;
  data: T;
}
