import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";
import {RunEnvType} from "../enums/RunEnvType";
import {WebSocketConnectionStatus} from "../enums/WebSocketConnectionStatus";



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
     * 返回Promise对象是为了在webSocket 连接断掉的情况下通过接口去恢复一下数据
     * @return Promise<WebSocketConnectionStatus>
     */
    connection: () => Promise<WebSocketConnectionStatus>;


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
    private connectionStatus: WebSocketConnectionStatus = WebSocketConnectionStatus.NONE;


    constructor(options: InitWebStockOptions) {
        this.options = options;
        if (RunEnvType.WEB === options.runEnvType) {
            //web环境下
            window.onbeforeunload = () => {
                if (this.webSocket) {
                    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
                    this.webSocket.close();
                }
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
        this.connectionStatus = WebSocketConnectionStatus.CLOSE;
        this.allowReconnect = allowReconnect;
    };

    /**
     * 连接
     */
    connection = (): Promise<WebSocketConnectionStatus> => {
        if (!this.allowReconnect) {
            console.log("不允许使用该持有者再次连接webSocket！");
            return Promise.reject(this.connectionStatus);
        }

        if (this.connectionStatus === WebSocketConnectionStatus.CONNECTING ||
            this.connectionStatus === WebSocketConnectionStatus.RECONNECT) {
            //处于连接状态，将连接状态置为已经连接
            this.connectionStatus = WebSocketConnectionStatus.CONNECTING;
            return Promise.resolve(this.connectionStatus);
        } else {
            //先关闭连接
            this.close(true);
            console.log("webSocket关闭或未连接");
        }
        const oldStatus = this.connectionStatus;
        this.connectionStatus = WebSocketConnectionStatus.WAITING;
        this.webSocket = this.createWebSocket();
        if (oldStatus === WebSocketConnectionStatus.NONE) {
            //首次连接
            this.connectionStatus = WebSocketConnectionStatus.CONNECTING
        } else {
            //发生了重连
            this.connectionStatus = WebSocketConnectionStatus.RECONNECT
        }
        return Promise.resolve(this.connectionStatus);
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
            this.connectionStatus = WebSocketConnectionStatus.CLOSE;
            lifeCycleHandler.onClose(event, ws);
        };

        return ws;
    }
}
