/**
 * 数据解析器
 * @param S
 * @param R
 */
export interface DataParser<S=any, R=any> {

    parser: (data:S) => R
}
