import {isWeb} from "../utils/WeexEnvUtil";
import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";

const IS_WEB = isWeb();


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
 * @return {WebSocket}
 */
export function buildWebSocket(options: InitWebStockOptions): void {

    const {url, router, lifeCycleHandler, protocols} = options;

    console.log("==准备连接websocket，url==> " + url);
    let ws;
    if (IS_WEB) {
        ws = new WebSocket(url, protocols);
    } else {
        ws = require("../utils/ExportWeexSdkModel").webSocket;
        ws.WebSocket(url, protocols  as string);
    }

    ws.onopen = (enent: Event) => {
        console.log("Connection open");
        lifeCycleHandler.onOpen(enent, ws);
    };

    ws.onmessage = (event: MessageEvent) => {
        // handler.onMessage( event,ws);
        router.routes(event, ws);
    };

    ws.onerror = (event: Event) => {
        console.log("Connection error.");
        //重连处理
        lifeCycleHandler.onError(event, options);
    };

    ws.onclose = (event: CloseEvent) => {
        console.log("Connection closed.");
        lifeCycleHandler.onClose(event, ws);
    };
    // return ws;
}
