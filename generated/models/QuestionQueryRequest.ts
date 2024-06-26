/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionQueryRequest = {
    answer?: string;
    containIds?: Array<number>;
    content?: string;
    current?: number;
    difficulty?: number;
    id?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    notContainIds?: Array<number>;
    pageSize?: number;
    passRate?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: Array<string>;
    title?: string;
    userId?: number;
};

