/**
 * 统一分页对象
 */
import {QueryType} from "../enums/QueryType";


export interface PageInfo<T> {

    readonly  total: number;

    readonly  records: Array<T>

    readonly  queryType: QueryType

    readonly  queryPage: number;

    readonly querySize: number
}
