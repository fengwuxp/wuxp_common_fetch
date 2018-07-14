import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";
import {isFunction} from "util";

const IS_WEB = document != null && isFunction(document.getElementById);


/**
 * 初始化配置
 */
export interface InitWebStockOptions {

    /**
     * web socket url
     */
    url: string;

    /**
     * 消息路由处理
     */
    router: WebSocketMessageRouter;


    /**
     * 生命周期处理者
     */
    lifeCycleHandler: WebSocketLifeCycleHandler;

    /**
     * 连接协议
     */
    protocols?: string | string[]
}

/**
 *  初始化一个webSocket 实例
 * @param {InitWebStockOptions} options
 * @return {WebSocketHolder}
 */
export function buildWebSocket(options: InitWebStockOptions): WebSocketHolder {


    return new DefaultWebSocketHolder(options);
}

/**
 * webSocket 持有者
 */
export interface WebSocketHolder {

    /**
     * 发送心跳包
     */
    // sendHeartbeatPackage: () => void;

    /**
     * 连接
     */
    connection: () => void;


    /**
     * 是否允许重连
     * @param {boolean} allowReconnect
     */
    close: (allowReconnect: boolean) => void;
}


class DefaultWebSocketHolder implements WebSocketHolder {

    /**
     * 连接配置
     */
    private options: InitWebStockOptions;

    /**
     * webSocket实例
     */
    private webSocket: WebSocket;

    /**
     * 是否允许重新连接
     * @type {boolean}
     */
    private allowReconnect?: boolean = true;


    constructor(options: InitWebStockOptions) {
        this.options = options;
    }


    /**
     * 关闭
     * @param {boolean} allowReconnect
     */
    close = (allowReconnect: boolean = false) => {
        this.webSocket.close();
        this.allowReconnect = allowReconnect;
    };

    /**
     * 连接
     */
    connection = () => {
        if (!this.allowReconnect) {
            console.log("不允许使用该持有者再次连接webSocket！");
            return;
        }
        this.webSocket = this.createWebSocket();
    };


    private createWebSocket = () => {
        const {url, router, lifeCycleHandler, protocols} = this.options;

        console.log("==准备连接websocket，url==> " + url);
        let ws;
        if (IS_WEB) {
            ws = new WebSocket(url, protocols);
        } else {
            ws = require("../utils/ExportWeexSdkModel").webSocket;
            ws.WebSocket(url, protocols  as string);
        }

        ws.onopen = (enent: Event) => {
            console.log("webSocket connection open");
            lifeCycleHandler.onOpen(enent, ws);
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("--onmessage-->", event);
            router.routes(event, ws);
        };

        ws.onerror = (event: Event) => {
            console.log("Connection error.");
            //重连处理
            lifeCycleHandler.onError(event, this.options);
        };

        ws.onclose = (event: CloseEvent) => {
            console.log("Connection closed.");
            lifeCycleHandler.onClose(event, ws);
        };

        return ws;
    }
}
