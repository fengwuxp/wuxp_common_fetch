import {ApiClientInterface} from "../../base/ApiClientInterface";
import {FetchOption} from "../../option/FetchOption";
import {isFunction} from "util";

/**
 * 返回一个代理的apiClient
 * @param {T} targetService
 * @param {ApiClientInterface} apiClient
 * @returns {T}
 */
export function buildApiClientProxy<T>(targetService: T, apiClient: ApiClientInterface<any>): T {
    // const proxyHandler: ProxyHandler<any> = {
    //     get: function (target: any, serviceMethod: PropertyKey, receiver: any): any {
    //         return function (...p) {
    //             const options: FetchOption = target[serviceMethod]();
    //
    //             //TODO url可以通过外部传入的getUrl(target:T,serviceMethod:string)获取，增加灵活性
    //             //TODO 适用场景，例如：在客户端需要请求多个模块的服务的是可以做到无缝切换
    //             return apiClient.dispatch(`/${targetService['serviceName']}/${serviceMethod as string}`, options, ...p);
    //         }
    //     },
    //     set: function (target, key, value, receiver): boolean {
    //         throw new Error("不允许添加新的接口方法！");
    //     }
    // };
    // return new Proxy(targetService, proxyHandler);

    const proxy = {} as T;


//         value:属性的值
//         writable:如果为false，属性的值就不能被重写,只能为只读了
//         configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
//         enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。

    for (const serviceMethod in targetService) {
        if (!isFunction(targetService[serviceMethod])) {
            continue;
        }
        Object.defineProperty(proxy, serviceMethod, {
            set: function (val) {
                throw new Error("proxy service 无法设置新的属性");
            },
            get: function () {
                return function (...p) {
                    const options: FetchOption = (targetService[serviceMethod] as any)();

                    //TODO url可以通过外部传入的getUrl(target:T,serviceMethod:string)获取，增加灵活性
                    //TODO 适用场景，例如：在客户端需要请求多个模块的服务的是可以做到无缝切换
                    return apiClient.dispatch(`/${targetService['serviceName']}/${serviceMethod as string}`, options, ...p);
                }
            }
        });
    }

    return proxy;
}
