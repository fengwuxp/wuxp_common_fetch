import {InitWebStockOptions} from "./WebSocketFactory";


type MessageHandle<T=any> = (message: T, socket: WebSocket) => void;

/**
 * web socket 消息处理
 */
export interface WebSocketMessageHandler {

    [propName: string]: MessageHandle | any

}

/**
 * web socket 生命周期参数
 */
export interface WebSocketLifeCycleHandler {

    /**
     * 打开连接
     * @param {Event} event
     * @param {WebSocket} socket
     */
    onOpen: (event: Event, socket: WebSocket) => void;


    /**
     * 连接被关闭
     * @param {CloseEvent} event
     * @param {WebSocket} socket
     */
    onClose: (event: CloseEvent, socket: WebSocket) => void;


    /**
     * 发生错误
     * @param {Event} event
     * @param {InitWebStockOptions} options
     */
    onError: (event: Event, options: InitWebStockOptions) => void;

    /**
     * 接受到消息
     * @param {MessageEvent} event
     * @param {WebSocket} socket
     */
    onMessage: (event: MessageEvent, socket: WebSocket) => void;
}
