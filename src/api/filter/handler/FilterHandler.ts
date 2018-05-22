/**
 * 过滤器处理者
 */
export interface FilterHandler<T=any> {


    preHandle: (options: T) => Promise<boolean>

    postHandle: (options: T, data: any) => Promise<any>;
}
