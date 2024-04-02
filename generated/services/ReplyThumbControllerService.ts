/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { ReplyThumbAddRequest } from '../models/ReplyThumbAddRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReplyThumbControllerService {
    /**
     * doReplyThumb
     * @param replyThumbAddRequest replyThumbAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doReplyThumbUsingPost(
        replyThumbAddRequest: ReplyThumbAddRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reply_thumb/',
            body: replyThumbAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getReply_thumbStatus
     * @param replyId replyId
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getReplyThumbStatusUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reply_thumb/get/reply_thumb/status',
            query: {
                'replyId': replyId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
