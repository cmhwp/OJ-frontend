/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from './JudgeInfo';
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';
export type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    error_message?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    outPut?: string;
    questionId?: number;
    questionVO?: QuestionVO;
    remark?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

