import ApiWeexBuild from "./ApiWeexBuild";
import {NeedSignFilter} from "../../filter/default/NeedSignFilter";
import {MemberSessionManager, NeedLoginFilter} from "../../filter/default/weex/NeedLoginFilter";
import GlobalApiConfig from "../../../config/GlobalAipConfig";
import {NeedNetworkFilter} from "../../filter/default/weex/NeedNetworkFilter";
import ApiClientProxyFactory from "../../base/ApiClientProxyFactory";
import {RespDataHandleFilter} from "../../filter/default/weex/RespDataHandleFilter";
import {NeedProgressBarFilter} from "../../filter/default/weex/NeedProgressBarFilter";
import {ExecuteMethod} from "../../filter/model/FilterItem";

const MemberSessionManager: MemberSessionManager = require("../../../../../../src/session/MemberSessionManagerImpl").default;


/**
 * 构建默认可以换
 * @type {ApiBuild}
 */
const api: any = ApiWeexBuild.registerDefaultFilter({
    filter: new NeedProgressBarFilter(),
    executeMethod: ExecuteMethod.ALL,
}).registerDefaultFilter({
    filter: new NeedSignFilter(GlobalApiConfig.CLIENT_ID, GlobalApiConfig.CLIENT_SECRET, GlobalApiConfig.CHANNEL_CODE),
}).registerDefaultFilter({
    filter: new NeedNetworkFilter(),
}).registerDefaultFilter({
    filter: new NeedLoginFilter(MemberSessionManager),
}).registerDefaultFilter({
    filter: new RespDataHandleFilter(),
}).build();

/**
 * weex api client代理服务工厂，将一个服务对象包裹，抛出一个新对象 (由于es5不支持proxy对象的降级实现)
 * Created by wuxp on 2017/5/17.
 */

export default class WeexServiceProxyFactory {


    /**
     * 获取一个代理服务对象的实例
     * @param targetService  目标服务对象
     * @return {{}}
     */
    public static newProxyInstances(targetService: any): any {
        return ApiClientProxyFactory.factory(targetService, api);
    }
}
