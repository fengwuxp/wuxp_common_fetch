import {NeedSignFilter} from "../../filter/default/NeedSignFilter";
import {MemberSessionManager, NeedLoginFilter} from "../../filter/default/es/NeedLoginFilter";
import GlobalApiConfig from "../../../config/GlobalAipConfig";
import {RespDataHandleFilter} from "../../filter/default/RespDataHandleFilter";
import {buildApiClientProxy} from "./BuildApiClientProxy";
import {FilterItem} from "../../filter/model/FilterItem";
import EsServiceSimpleProxyFactory from "./EsServiceSimpleProxyFactory";
import FetchHttpErrorHandler from "../../error/FetchHttpErrorHandler";
import ApiClientFetch from "./ApiClientFetch";

const MemberSessionManager: MemberSessionManager = require("../../../../../../src/session/MemberSessionManagerImpl").default;


const defaultFilter: Array<FilterItem> = [
    {
        filter: new NeedSignFilter(GlobalApiConfig.CLIENT_ID, GlobalApiConfig.CLIENT_SECRET, GlobalApiConfig.CHANNEL_CODE)
    },
    {
        filter: new NeedLoginFilter(MemberSessionManager)
    },
    {
        filter: new RespDataHandleFilter()
    }
];

//http请求处理错误处理者
const httpErrorHandler: FetchHttpErrorHandler = new FetchHttpErrorHandler();


const api = EsServiceSimpleProxyFactory.newProxyInstances<ApiClientFetch>(httpErrorHandler, defaultFilter);


/**
 * 代理服务工厂，将一个服务对象包裹，抛出一个新对象
 * Created by wuxp on 2017/5/17.
 */
export default class EsServiceProxyFactory {


    /**
     * 获取一个代理服务对象的实例
     * @param targetService  目标服务对象
     * @return {{}}
     */
    public static newProxyInstances<T>(targetService: T): T {

        return buildApiClientProxy(targetService, api);
    }

    /**
     * 添加一个过滤器到最前面
     * @param {FilterItem} filter
     * @return {EsServiceProxyFactory}
     */
    public static addFilterByBegin(filter: FilterItem) {
        defaultFilter.unshift(filter);
        return EsServiceProxyFactory;
    }

    /**
     * 添加一个过滤器到最最后
     * @param {FilterItem} filter
     */
    public static addFilterByEnd(filter: FilterItem) {
        defaultFilter.push(filter);
        return EsServiceProxyFactory;
    }

}
