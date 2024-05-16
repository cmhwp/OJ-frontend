/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_Picture_ } from '../models/BaseResponse_Page_Picture_';
import type { PictureQueryRequest } from '../models/PictureQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PictureControllerService {
    /**
     * listPictureByPage
     * @param pictureQueryRequest pictureQueryRequest
     * @returns BaseResponse_Page_Picture_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listPictureByPageUsingPost(
        pictureQueryRequest: PictureQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Picture_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/picture/list/page/vo',
            body: pictureQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
