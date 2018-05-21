import {Enum} from "./Enum";

/**
 * 查询类型
 */
export default class QueryType {

    public static readonly QUERY_NUM: Enum = {
        name: "QUERY_NUM",
        ordinal: 0,
        desc: "查询总数"
    };

    public static readonly QUERY_RESET: Enum = {
        name: "QUERY_RESET",
        ordinal: 1,
        desc: "查询结果集"
    };

    public static readonly QUERY_BOTH: Enum = {
        name: "QUERY_BOTH",
        ordinal: 2,
        desc: "查总数和结果集"
    }
}