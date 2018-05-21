/**
 * url pattern表达式
 */
export interface UrlPattern {

    [propName: string]: Array<string | RegExp> |string;
}