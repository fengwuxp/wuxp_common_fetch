import {isNullOrUndefined} from "util";

/**
 * 字符串工具类
 */
export default class StringUtils {

    /**
     * 是否存在内容
     * @param {string} str
     * @return {boolean}
     */
    public static hasText = (str: string): boolean => {
        if (isNullOrUndefined(str)) {
            return false;
        }
        if (str.trim().length === 0) {
            return false;
        }
        return true;
    }
}
