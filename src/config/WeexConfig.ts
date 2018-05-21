import {ApiConfig} from "./ApiConfig";


/**
 * weex 相关配置
 */
export interface WeexConfig extends ApiConfig {


    /**
     * 图片服务域名
     * @type {string}
     */
    PIC_SERVICE_DOMAIN?: string;

    /**
     * 图片服务地址
     * @type {string}
     */
    PIC_SERVICE_URL?: string;


    /**
     * app-footer头部配置
     */
    APP_HEADER_CONFIG: any;

    /**
     * app-footer 配置
     */
    APP_FOOTER_CONFIG: any;

    /**
     * 在切换远程和本地js是需要用来判别是否是从本地的目录加载的一个标识
     * 路径格式为 ios项目名称+".app"  例如："xxx.app"  xxx是ios项目名称
     */
    IOS_PROJECT_NAME?: string;


    //为了方便在本地开发是使用远程的接口
    GLOBAL_USER_DATA_TYPE_JSONP?: boolean;     //开发环境使用远程接口,正式环境使用同域名下的接口 __DEV__

    /**
     * 不需要登陆的url配置
     */
    NO_LOGIN_URL_MAP?: any;

    /**
     * WEB 部署目录
     */
    WEB_DEPLOYMENT_DIRECTORY?: string;
}
