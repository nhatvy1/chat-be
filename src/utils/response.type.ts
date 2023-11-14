import { HttpStatus } from '@nestjs/common';

interface ResponseType<T> {
  statusCode: HttpStatus;
  message: string;
  result?: T;
}
export const Response = <T>({
  statusCode,
  message,
  result,
}: ResponseType<T>) => {
  return {
    statusCode: statusCode,
    message: message,
    result: result || {},
  };
};
