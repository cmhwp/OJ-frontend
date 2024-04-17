/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CodeControllerService {
    /**
     * sendEmailLoginCode
     * @param email email
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static sendEmailLoginCodeUsingGet(
        email: string,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/code/sendEmailLoginCode',
            query: {
                'email': email,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * sendRegisterCode
     * @param email email
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static sendRegisterCodeUsingGet(
        email: string,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/code/sendRegisterCode',
            query: {
                'email': email,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * sendResetPasswordCode
     * @param email email
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static sendResetPasswordCodeUsingGet(
        email: string,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/code/sendResetPasswordCode',
            query: {
                'email': email,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
