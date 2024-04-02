/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_Page_PostVO_ } from '../models/BaseResponse_Page_PostVO_';
import type { PostQueryRequest } from '../models/PostQueryRequest';
import type { PostReadAddRequest } from '../models/PostReadAddRequest';
import type { PostReadQueryRequest } from '../models/PostReadQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostReadControllerService {
    /**
     * doPostRead
     * @param postReadAddRequest postReadAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doPostReadUsingPost(
        postReadAddRequest: PostReadAddRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_read/',
            body: postReadAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listReadPostByPage
     * @param postReadQueryRequest postReadQueryRequest
     * @returns BaseResponse_Page_PostVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listReadPostByPageUsingPost(
        postReadQueryRequest: PostReadQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_read/list/page',
            body: postReadQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyReadPostByPage
     * @param postQueryRequest postQueryRequest
     * @returns BaseResponse_Page_PostVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyReadPostByPageUsingPost(
        postQueryRequest: PostQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_read/my/list/page',
            body: postQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
