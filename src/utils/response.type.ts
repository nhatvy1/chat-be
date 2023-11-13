import { HttpStatus } from "@nestjs/common";

export const Response = <T>({
  status,
  message,
  result,
}: {
  status: HttpStatus;
  message: string;
  result?: T;
}) => {
  return { status, message, result: result || {} };
};
