/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from './JudgeInfo';
export type QuestionSubmitRunResultResponse = {
    actualOutput?: Array<string>;
    error_message?: string;
    expectedOutput?: Array<string>;
    judgeInfo?: JudgeInfo;
    status?: number;
};

