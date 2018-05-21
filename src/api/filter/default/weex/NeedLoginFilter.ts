import {isNullOrUndefined} from "util";
import {WeexStreamOption} from "../../../option/WeexStreamOption";
import ApiAbstractFilter from "../../ApiAbstractFilter";
import {timer} from "../../../../utils/ExportWeexSdkModel";
import {broadcast} from "../../../../utils/ExpotrtWeexCustomModel";
import {ApiResp} from "../../../model/ApiResp";
import {ReqMethod} from "../../../enums/ReqMethod";


/**
 * 用户会话管理
 */
export interface MemberSessionManager<T=any> {

    /**
     * 获取当前登录用户
     * @param  params
     * @return {Promise<T> | any}
     */
    getCurrentLoginMember(params?: T): Promise<T> | any;

    /**
     * 保存用户信息
     * @param member
     * @return {void | Promise<T>}
     */
    saveMember?(member: T): void | Promise<any>;

    /**
     * 移除当前登录用户
     * @returns {void | Promise<T>}
     */
    removeMember(): void | Promise<T>;
}


/**
 * token处理
 * @param {string} token
 * @param {WeexStreamOption} options
 */
const tokenHandle = (token: string = "", options: WeexStreamOption): void => {
    //设置token
    if (options.method === ReqMethod.GET) {
        options.queryPrams = options.queryPrams || {};
        options.queryPrams.token = token;
    } else {
        options.headers = options.headers || {};
        options.headers.token = token;

    }
};


let LOGIN_BROADCAST_IS_SEND: boolean = false;


export const AGENT_LOGIN_CATEGORY: string = "WEEX_EVENT";

export const AGENT_LOGIN_EVENT: string = "AGAIN_LOGIN";
/**
 * 发送登录通知
 *@param  data 服务端相应数据
 *@param {Function}  callback
 */
const sendLoginBroadcast = (data: any, callback: Function): void => {
    //发送打开登录页面的广播  跳转到登录页面
    if (LOGIN_BROADCAST_IS_SEND) {
        //一定时间内只允许发布一次登录通知广播
        return;
    }
    LOGIN_BROADCAST_IS_SEND = true;

    //发送登录
    broadcast.send(AGENT_LOGIN_CATEGORY, AGENT_LOGIN_EVENT, data);

    //3秒后恢复标记位置
    timer.setTimeout(() => {
        LOGIN_BROADCAST_IS_SEND = false;
    }, 3 * 1000);
};


/**
 * 需要登陆的过滤拦截
 */
export class NeedLoginFilter extends ApiAbstractFilter {

    private memberSessionManager: MemberSessionManager;


    constructor(memberSessionManager: MemberSessionManager) {
        super();
        this.memberSessionManager = memberSessionManager;
    }

    preHandle(options: WeexStreamOption): Promise<boolean> {

        return new Promise((resolve = (param: any) => {
        }) => {
            if (options.url.indexOf("/ws/") > 0) {
                resolve(true);
                return;
            }
            let promise: Promise<any> = this.memberSessionManager.getCurrentLoginMember();
            promise.then((memberInfo) => {
                tokenHandle(memberInfo['token'], options);
            })['finally'](() => {
                resolve(true);
            })
        });
    }


    postHandle(resp: ApiResp<any>): boolean {

        //token失效处理
        const {code, data} = resp;

        if (code === 99) {
            sendLoginBroadcast(data, () => {
                this.memberSessionManager.removeMember();
            });
            return false
        } else {
            return true;
        }

    }
}
