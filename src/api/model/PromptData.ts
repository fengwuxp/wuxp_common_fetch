import {PromptType} from "../enums/PromptType";

/**
 * 提示数据
 */
export interface PromptData {

    /**
     * 标题
     */
    title: string;

    /**
     * 提示内容
     */
    content: string;

    /**
     * 提示类型
     */
    type: PromptType;

    /**
     * 按钮配置
     * key  按钮名称
     * value 是否继续（布尔值）
     */
    buttons: object;
}
