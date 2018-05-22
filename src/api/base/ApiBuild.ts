import {FilterItem} from "../filter/model/FilterItem";

/**
 * 构建api client
 */
export abstract class ApiBuild<T> {


    protected filterList: FilterItem[] = [];

    protected defaultFilter: FilterItem[] = [];

    constructor() {
    }


    protected addLast = (item: FilterItem) => {
        this.filterList.push(item);
    };

    protected addFirst = (item: FilterItem) => {
        this.filterList.unshift(item);
    };

    protected addDefaultFilter = (item: FilterItem) => {
        this.defaultFilter.push(item);
    };

    /**
     * 集中式的注册filter
     * @return {ApiFetchBuilder}
     */
    registerFilter = (items: Array<FilterItem>) => {
        //注册 filter
        this.filterList.push(...items);
        return this;
    };

    /**
     * 注册filter到最后
     * @param {FilterItem} item
     * @return {ApiFetchBuilder}
     */
    registerLastFilter = (item: FilterItem) => {
        this.addLast(item);
        return this;
    };

    /**
     * 注册filter到第一个
     * @param {FilterItem} item
     * @return {ApiFetchBuilder}
     */
    registerFirstFilter = (item: FilterItem) => {
        this.addFirst(item);
        return this;
    };

    /**
     * 注册默认filter
     * @param {FilterItem} item
     */
    registerDefaultFilter = (item: FilterItem) => {
        this.addDefaultFilter(item);
        return this;
    };

    /**
     * build 客户端请求工具
     * @return {T}
     */
    abstract build(): T;
}



