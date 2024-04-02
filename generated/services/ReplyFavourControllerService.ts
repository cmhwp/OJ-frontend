/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_PostReplyVO_ } from '../models/BaseResponse_Page_PostReplyVO_';
import type { PostReplyQueryRequest } from '../models/PostReplyQueryRequest';
import type { ReplyFavourAddRequest } from '../models/ReplyFavourAddRequest';
import type { ReplyFavourQueryRequest } from '../models/ReplyFavourQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReplyFavourControllerService {
    /**
     * doReplyFavour
     * @param replyFavourAddRequest replyFavourAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doReplyFavourUsingPost(
        replyFavourAddRequest: ReplyFavourAddRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reply_favour/',
            body: replyFavourAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getReply_favourStatus
     * @param replyId replyId
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getReplyFavourStatusUsingGet(
        replyId?: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reply_favour/get/reply_favour/status',
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
    /**
     * listFavourReplyByPage
     * @param replyFavourQueryRequest replyFavourQueryRequest
     * @returns BaseResponse_Page_PostReplyVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listFavourReplyByPageUsingPost(
        replyFavourQueryRequest: ReplyFavourQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostReplyVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reply_favour/list/page',
            body: replyFavourQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyFavourReplyByPage
     * @param postReplyQueryRequest postReplyQueryRequest
     * @returns BaseResponse_Page_PostReplyVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyFavourReplyByPageUsingPost(
        postReplyQueryRequest: PostReplyQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostReplyVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reply_favour/my/list/page',
            body: postReplyQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
