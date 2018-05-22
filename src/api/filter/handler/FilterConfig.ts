/**
 * 拦截器配置
 */
import {FilterItem} from "../model/FilterItem";

export interface FilterConfig {

    /**
     * 拦截配置
     */
    items: Array<FilterItem>
}
