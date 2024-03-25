/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_double_ } from '../models/BaseResponse_double_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionSubmitVO_ } from '../models/BaseResponse_Page_QuestionSubmitVO_';
import type { BaseResponse_QuestionSubmitConsumptionTimeAndMemoryRankingResponse_ } from '../models/BaseResponse_QuestionSubmitConsumptionTimeAndMemoryRankingResponse_';
import type { BaseResponse_QuestionSubmitRunResultResponse_ } from '../models/BaseResponse_QuestionSubmitRunResultResponse_';
import type { BaseResponse_QuestionSubmitStatusResponse_ } from '../models/BaseResponse_QuestionSubmitStatusResponse_';
import type { BaseResponse_QuestionSubmitVO_ } from '../models/BaseResponse_QuestionSubmitVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionRunAddRequest } from '../models/QuestionRunAddRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { QuestionSubmitUpdateRequest } from '../models/QuestionSubmitUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSubmitControllerService {
    /**
     * deleteQuestionSubmit
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionSubmitUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * doQuestionRun
     * @param questionRunAddRequest questionRunAddRequest
     * @returns BaseResponse_QuestionSubmitRunResultResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doQuestionRunUsingPost(
        questionRunAddRequest: QuestionRunAddRequest,
    ): CancelablePromise<BaseResponse_QuestionSubmitRunResultResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/doRun',
            body: questionRunAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * doQuestionSubmit
     * @param questionSubmitAddRequest questionSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doQuestionSubmitUsingPost(
        questionSubmitAddRequest: QuestionSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/doSubmit',
            body: questionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitById
     * @param id id
     * @returns BaseResponse_QuestionSubmitVO_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionSubmitVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitConsumptionTimeAndMemoryRanking
     * @param language language
     * @param questionId questionId
     * @param questionSubmitId questionSubmitId
     * @returns BaseResponse_QuestionSubmitConsumptionTimeAndMemoryRankingResponse_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitConsumptionTimeAndMemoryRankingUsingGet(
        language?: string,
        questionId?: number,
        questionSubmitId?: number,
    ): CancelablePromise<BaseResponse_QuestionSubmitConsumptionTimeAndMemoryRankingResponse_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/consumption_Time_Ranking',
            query: {
                'language': language,
                'questionId': questionId,
                'questionSubmitId': questionSubmitId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitDifficulty
     * @param difficulty difficulty
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitDifficultyUsingGet(
        difficulty?: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/difficulty_number',
            query: {
                'difficulty': difficulty,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitDifficultyPassRate
     * @param difficulty difficulty
     * @returns BaseResponse_double_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitDifficultyPassRateUsingGet(
        difficulty?: number,
    ): CancelablePromise<BaseResponse_double_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/difficulty_pass_rate',
            query: {
                'difficulty': difficulty,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitPassRate
     * @returns BaseResponse_double_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitPassRateUsingGet(): CancelablePromise<BaseResponse_double_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/pass_rate',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitStatus
     * @param questionId questionId
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitStatusUsingGet(
        questionId?: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/status',
            query: {
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitStatusByUser
     * @returns BaseResponse_QuestionSubmitStatusResponse_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitStatusByUserUsingGet(): CancelablePromise<BaseResponse_QuestionSubmitStatusResponse_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_submit/get/statusQuestionSubmit',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionSubmitVoByPage
     * @param questionSubmitQueryRequest questionSubmitQueryRequest
     * @returns BaseResponse_Page_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitVoByPageUsingPost(
        questionSubmitQueryRequest: QuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/list/page/vo',
            body: questionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestionSubmit
     * @param questionSubmitUpdateRequest questionSubmitUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionSubmitUsingPost(
        questionSubmitUpdateRequest: QuestionSubmitUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/update',
            body: questionSubmitUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
