/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionAddRequest = {
    answer?: string;
    backendCode?: string;
    content?: string;
    difficulty?: number;
    frontendCode?: string;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    logicCode?: string;
    tags?: Array<string>;
    title?: string;
};

