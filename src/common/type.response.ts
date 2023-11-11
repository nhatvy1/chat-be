import { HttpStatus } from '@nestjs/common';

export enum RESPONSE_STATUS {
  SUCESS = 1,
  FAILED = 0,
}

export const Response = <T>({
  statusCode,
  message,
  result,
}: {
  statusCode: HttpStatus;
  message?: string;
  result?: T;
}) => {
  return {
    statusCode: statusCode,
    message,
    result: result || {},
  };
};
