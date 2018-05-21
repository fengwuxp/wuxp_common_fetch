import {ApiReq} from "./ApiReq";

/**
 * 查询请求对象
 */
export interface ApiQueryReq extends ApiReq {

    /**
     * 查询类型
     */
     queryType?: string;

    /**
     * 查询页码
     */
     queryPage?: number;

    /**
     * 查询大小
     */
     querySize?: number;

    /**
     * 排序字段
     */
     orderBy?: Array<string>;


    /**
     * 排序类型，\"asc\"升序，\"desc\"降序，必须与orderBy一一对应
     */
     orderType?: Array<string>;

    /**
     * 是否使用缓存
     */
     fromCache?: boolean;

    /**
     *总数
     */
     total?: number;



}
