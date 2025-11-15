import type { AxiosError } from "axios";

type ErrorResponse = {
    message: string;
    statusCode: number;
};

export type ErrorResponseType = AxiosError<ErrorResponse>;

export type QueryParamsType = {
    search?: string;
    page?: number;
    limit?: number;
}