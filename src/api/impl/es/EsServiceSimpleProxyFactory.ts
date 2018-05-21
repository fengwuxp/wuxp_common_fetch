import ApiFetchBuilder from "./ApiFetchBuilder";
import {FilterItem} from "../../filter/model/FilterItem";
import {buildApiClientProxy} from "./BuildApiClientProxy";
import {isNullOrUndefined} from "util";
import {FetchOption} from "../../option/FetchOption";
import {HttpErrorHandler} from "../../error/HttpErrorHandler";


/**
 * 代理服务工厂，将一个服务对象包裹，抛出一个新对象
 */
export default class EsServiceSimpleProxyFactory {


    /**
     * 获取一个代理服务对象的实例
     * @param httpErrorHandler http错误处理者
     * @param defaultFilters 默认的过滤器
     * @param defaultOptions 默认的请求配置
     * @param targetService  目标服务对象
     * @return {{}}
     */
    public static newProxyInstances<T>(httpErrorHandler: HttpErrorHandler<Response>,
                                       defaultFilters: Array<FilterItem> = [],
                                       defaultOptions?: FetchOption,
                                       targetService?: T): T {
        const builder = ApiFetchBuilder.builder();
        defaultFilters.forEach(item => {

            builder.registerDefaultFilter(item);
        });

        const api: any = builder.httpErrorHandler(httpErrorHandler)
            .defaultOptions(defaultOptions)
            .build();
        if (isNullOrUndefined(targetService)) {
            return api;
        }

        return buildApiClientProxy(targetService, api);
    }
}


