/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_SearchVO_ } from '../models/BaseResponse_SearchVO_';
import type { SearchAllQueryRequest } from '../models/SearchAllQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchControllerService {
    /**
     * searchAllVoList
     * @param searchAllRequest searchAllRequest
     * @returns BaseResponse_SearchVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static searchAllVoListUsingPost(
        searchAllRequest: SearchAllQueryRequest,
    ): CancelablePromise<BaseResponse_SearchVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/search/all',
            body: searchAllRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
