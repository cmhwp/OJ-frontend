/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';
export type QuestionVO = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    difficulty?: number;
    favourNum?: number;
    frontendCode?: string;
    id?: number;
    input?: Array<Array<string>>;
    inputListName?: Array<Array<string>>;
    judgeCase?: Array<string>;
    judgeConfig?: JudgeConfig;
    output?: Array<string>;
    passRate?: number;
    status?: number;
    submitNum?: number;
    tags?: Array<string>;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

