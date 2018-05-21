/**
 * 动作配置
 */
import {PromptData} from "./PromptData";

/**
 * 动作配置
 */
export interface Action {

    /**
     * "动作类型，可能是跳转视图或者是执行某个动作
     * 通过前缀来区分动作或者视图
     * view    视图
     * action  操作
     */
    type: string;


    /**
     * 动作的值
     */
    value: string

    /**
     * 提示数据
     */
    promptData: PromptData;

    /**
     * 动作参数
     */
    params: object;

    /**
     * 动作说明
     */
    desc: string;
}
