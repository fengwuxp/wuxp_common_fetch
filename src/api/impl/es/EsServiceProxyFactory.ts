import {NeedSignFilter} from "../../filter/default/NeedSignFilter";
import {MemberSessionManager, NeedLoginFilter} from "../../filter/default/es/NeedLoginFilter";
import GlobalApiConfig from "../../../config/GlobalAipConfig";

import ApiFetchBuilder from "./ApiFetchBuilder";
import {RespDataHandleFilter} from "../../filter/default/RespDataHandleFilter";
import {buildApiClientProxy} from "./BuildApiClientProxy";

const MemberSessionManager: MemberSessionManager = require("../../../../../../src/session/MemberSessionManagerImpl").default;

/**
 * 构建默认可以换
 * @type {ApiBuild}
 */
const api: any = ApiFetchBuilder.builder().registerDefaultFilter({
    filter: new NeedSignFilter(GlobalApiConfig.CLIENT_ID,GlobalApiConfig.CLIENT_SECRET, GlobalApiConfig.CHANNEL_CODE),
    filterName: "NeedSignFilter"
}).registerDefaultFilter({
    filter: new NeedLoginFilter(MemberSessionManager),
    filterName: "NeedLoginFilter",
}).registerDefaultFilter({
    filter: new RespDataHandleFilter(),
    filterName: "RespDataHandleFilter"
}).build();


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
}
