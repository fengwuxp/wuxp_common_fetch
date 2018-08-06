import {FilterItem} from "../model/FilterItem";

/**
 * 过滤器处理者
 */
export interface FilterHandler<T=any> {

    filterList: FilterItem[];

    preHandle: (options: T) => Promise<boolean>

    postHandle: (options: T, data: any) => Promise<any>;
}
