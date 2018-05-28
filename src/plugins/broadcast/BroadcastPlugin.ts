import {EsPlugin} from "../EsPlugin";
import {isNullOrUndefined} from "util";
import {BroadcastEvent} from "./BroadcastEvent";
import {BroadcastEventData} from "./BroadcastData";
import {BroadcastEventHolder} from "./BroadcastEventHolder";

/**
 * 广播模块插件
 */
export default class BroadcastPlugin implements EsPlugin {

    /**
     * 事件注册保存器
     */
    private eventMap: BroadcastEvent;

    /**
     * 事件注册数据
     */
    private eventData: BroadcastEventData;


    constructor() {
        this.eventMap = {};
        this.eventData = {};
    }


    /**
     * 注册事件
     * @param {string} category   事件分类
     * @param {string} eventName  事件名称
     * @param {() => Function} succFn  接收到成功事件的广播
     * @param {() => Function} errorFn 接收到失败事件的广播
     */
    public register = (category: string,
                       eventName: string,
                       succFn: Function = () => {
                       },
                       errorFn: Function = () => {
                       }): void => {
        const key: string = this.getEventName(category, eventName);

        //TODO 多事件广播待支持
        if (isNullOrUndefined(this.eventMap[key])) {
            this.eventMap[key] = [];
        }
        this.eventMap[key].push({
            success: succFn,
            error: errorFn
        });
        console.log("注册事件成功--> " + category + " : " + eventName);
        // console.log(this.eventMap[key]);

        if (isNullOrUndefined(this.eventData[key])) {
            return
        }
        //当事件数据存储器中有该注册事件的值，进行消息广播
        //进行广播，此次广播是为了接收历史广播的的数据
        this.broadcast(key, false);
    };

    /**
     * 发送广播事件
     * @param {string} category
     * @param {string} eventName
     * @param {any} data       成功数据
     * @param {any} errorData  错误数据
     */
    public send = (category: string, eventName: string, data: any, errorData?: any): void => {

        //保存广播数据
        const key: string = this.getEventName(category, eventName);
        if (isNullOrUndefined(this.eventData[key])) {
            this.eventData[key] = [];
        }
        this.eventData[key].push({
            success: data,
            errorData
        });
        //进行广播
        this.broadcast(key);
    };


    /**
     * 广播
     * @param {string} key  事件key
     * @param {boolean} isClear 是否清除当前key指向的eventData中的数据
     */
    private broadcast = (key: string, isClear: boolean = true): void => {

        const eventDatum: Array<any> = this.eventData[key];

        if (isNullOrUndefined(eventDatum)) {
            console.warn("key-> " + key + " 对应的数据存在!");
            return;
        }

        const eventHolders: Array<BroadcastEventHolder> = this.eventMap[key];

        console.log(eventHolders);

        if (isNullOrUndefined(eventHolders)) {
            console.warn("key-> " + key + " 对应的处理方式不存在!");
            return;
        }

        /**
         * 遍历数据进行广播
         */
        eventDatum.forEach(({success}) => {
            // if (!isNullOrUndefined(success)) {
            // }
            //TODO 做值copy
            let data = success;
            eventHolders.forEach((item: BroadcastEventHolder) => {
                item.success({data});
            });
            // if (!isNullOrUndefined(error)) {
            //    //TODO 做值copy
            //     let data = error;
            //     eventHolders.forEach((item: BroadcastEventHolder) => {
            //         item.error({data});
            //     });
            // }
        });

        //清除广播数据
        if (isClear) {
            this.eventData[key] = [];
        }
    };


    /**
     * 获取一个事件的名称
     * @param {string} category
     * @param {string} eventName
     * @return {string}
     */
    private getEventName = (category: string, eventName: string): string => {
        return category + "_" + eventName;
    }
}
