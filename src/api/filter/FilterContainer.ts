import {ApiFilter} from "./ApiFilter";
import {FilterItem} from "./model/FilterItem";


/**
 * filter 容器
 * @type {ApiFilter[]}
 */
const FILTERS: Array<FilterItem> = new Array<FilterItem>();

/**
 * 默认的filter 一定会被使用的
 * @type {FilterItem[]}
 */
const DEFAULT_FILTERS: Array<FilterItem> = new Array<FilterItem>();

/**
 * 添加到第一个
 * @param {FilterItem} filter
 */
const addFirst = (filter: FilterItem) => {
    if (!filterIsExist(FILTERS, filter)) {
        FILTERS.unshift(filter);
    }
};

/**
 * 添加到最后一个
 * @param {FilterItem} filter
 *
 */
const addLast = (filter: FilterItem) => {
    if (!filterIsExist(FILTERS, filter)) {
        FILTERS.push(filter);
    }
};

/**
 * 添加默认的filter
 * @param {FilterItem} filter
 */
const addDefaultFilter = (filter: FilterItem) => {
    if (!filterIsExist(DEFAULT_FILTERS, filter)) {
        DEFAULT_FILTERS.push(filter);
    }

};

function filterIsExist(fliters: Array<FilterItem>, filter: FilterItem) {
    return fliters.some((item) => {
        return item.filterName === filter.filterName;
    })
}


/**
 * 获取filter列表
 * @return {Array<FilterItem>}
 */
const getFilters = (): Array<FilterItem> => {
    return FILTERS;
};

/**
 * 获取默认的filter列表
 * @return {Array<FilterItem>}
 */
const getDefaultFilter = (): Array<FilterItem> => {
    return DEFAULT_FILTERS;
};

export {
    addFirst,
    addLast,
    addDefaultFilter,
    getFilters,
    getDefaultFilter
}
