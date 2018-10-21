import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";
import {RunEnvType} from "../enums/RunEnvType";


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
    protocols?: string | string[];

    /**
     * 平台
     */
    runEnvType: RunEnvType;
}

/**
 *  初始化一个webSocket 实例
 * @param {InitWebStockOptions} options
 * @return {WebSocketHolder}
 */
export function buildWebSocket(options: InitWebStockOptions): WebSocketHolder {


    const defaultWebSocketHolder = new DefaultWebSocketHolder(options);
    defaultWebSocketHolder.connection();
    return defaultWebSocketHolder;
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
    close: (allowReconnect?: boolean) => void;
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
    private allowReconnect: boolean = true;

    /**
     * 连接状态
     */
    private connectionStatus: boolean;


    constructor(options: InitWebStockOptions) {
        this.options = options;
        window.onbeforeunload = () => {
            if (this.webSocket) {
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
                this.webSocket.close();
            }
        }
    }


    /**
     * 关闭
     * @param {boolean} allowReconnect 是否允许重连
     */
    close = (allowReconnect: boolean = false) => {
        if (this.webSocket) {
            this.webSocket.close();
        }
        this.webSocket = null;
        this.connectionStatus = false;
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

        if (this.connectionStatus === true) {
            //处于连接状态
            console.log("webSocket已连接");
            return;
        } else {
            //先关闭连接
            this.close(true);
            console.log("webSocket关闭或未连接");
        }
        this.webSocket = this.createWebSocket();
        this.connectionStatus = true;
    };


    private createWebSocket = () => {
        const {url, runEnvType, router, lifeCycleHandler, protocols} = this.options;

        console.log("==准备连接websocket，url==> " + url);
        let ws;
        if (RunEnvType.RAX === runEnvType || RunEnvType.WEEX === runEnvType) {
            ws = require("../utils/ExportWeexSdkModel").webSocket;
            ws.WebSocket(url, protocols  as string);
        } else if (RunEnvType.WEB === runEnvType) {
            ws = new WebSocket(url, protocols);
        } else {
            throw new Error(`不支持的平台类型：${runEnvType}`);
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
            //发生错误
            this.close(true);
            //重连处理
            lifeCycleHandler.onError(event, this.options);
        };

        ws.onclose = (event: CloseEvent) => {
            console.log("Connection closed.");
            //解决ios锁屏后 webSocket 连接被关闭的问题
            this.connectionStatus = false;
            lifeCycleHandler.onClose(event, ws);
        };

        return ws;
    }
}
