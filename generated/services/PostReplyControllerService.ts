/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_PostReplyVO_ } from '../models/BaseResponse_Page_PostReplyVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { PostReplyAddRequest } from '../models/PostReplyAddRequest';
import type { PostReplyQueryRequest } from '../models/PostReplyQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostReplyControllerService {
    /**
     * addPostReply
     * @param postReplyAddRequest postReplyAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPostReplyUsingPost(
        postReplyAddRequest: PostReplyAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_reply/add',
            body: postReplyAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deletePostReply
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deletePostReplyUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_reply/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listPostReplyVOByPage
     * @param postReplyQueryRequest postReplyQueryRequest
     * @returns BaseResponse_Page_PostReplyVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listPostReplyVoByPageUsingPost(
        postReplyQueryRequest: PostReplyQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostReplyVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_reply/list/page/vo',
            body: postReplyQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
