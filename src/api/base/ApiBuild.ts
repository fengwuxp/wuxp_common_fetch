import {FilterItem} from "../filter/model/FilterItem";
import {addLast, addFirst,addDefaultFilter} from "../filter/FilterContainer";

/**
 * 构建api client
 */
export abstract class ApiBuild<T> {


    constructor() {
    }

    /**
     * 集中式的注册filter
     * @return {ApiFetchBuilder}
     */
    registerFilter = (items: Array<FilterItem>) => {
        //注册 filter
        items.forEach((item: FilterItem) => {
            addLast(item);
        });

        return this;
    };

    /**
     * 注册filter到最后
     * @param {FilterItem} item
     * @return {ApiFetchBuilder}
     */
    registerLastFilter = (item: FilterItem) => {
        addLast(item);
        return this;
    };

    /**
     * 注册filter到第一个
     * @param {FilterItem} item
     * @return {ApiFetchBuilder}
     */
    registerFirstFilter = (item: FilterItem) => {
        addFirst(item);
        return this;
    };

    /**
     * 注册默认filter
     * @param {FilterItem} item
     */
    registerDefaultFilter=(item: FilterItem)=>{
        addDefaultFilter(item);
        return this;
    };

    /**
     * build 客户端请求工具
     * @return {T}
     */
    abstract build(): T;
}



