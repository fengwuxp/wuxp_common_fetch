import {ApiClientInterface} from "../../base/ApiClientInterface";
import {FetchOption} from "../../option/FetchOption";

/**
 * 返回一个代理的apiClient
 * @param {T} targetService
 * @param {ApiClientInterface} apiClient
 * @returns {T}
 */
export function buildApiClientProxy<T>(targetService: T, apiClient: ApiClientInterface<any>): T {
    const proxyHandler: ProxyHandler<any> = {
        get: function (target: any, serviceMethod: PropertyKey, receiver: any): any {
            return function (...p) {
                const options: FetchOption = target[serviceMethod]();
                return apiClient.dispatch(`/${targetService['serviceName']}/${serviceMethod as string}`, options, ...p);
            }
        },
        set: function (target, key, value, receiver): boolean {
            throw new Error("不允许添加新的接口方法！");
        }
    };
    return new Proxy(targetService, proxyHandler);
}
