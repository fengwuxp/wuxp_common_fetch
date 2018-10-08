import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";
import {InitWebStockOptions, WebSocketHolder} from "./WebSocketFactory";
import {WebSocketMessageHandler} from "./WebSocketHandler";

/**
 *
 * @author wxup
 * @create 2018-06-25 12:58
 **/
export default abstract class WebSocketAbstractRouter implements WebSocketMessageRouter, WebSocketLifeCycleHandler {

    /**
     * 消息处理器
     */
    protected messageHandler: WebSocketMessageHandler;

    /**
     * webSocket实例的持有者
     */
    protected _webSocketHolder: WebSocketHolder;

    constructor(handlers: WebSocketMessageHandler[]) {
        let handler = {};
        // console.log("-----handlers---->", handlers);
        //合并
        handlers.forEach(item => {
            handler = {...handler, ...item};
        });
        this.messageHandler = handler;
        // console.log("------- this.messageHandler----->", this.messageHandler);
    }


    set webSocketHolder(value: WebSocketHolder) {
        this._webSocketHolder = value;
    }

    abstract routes: (event: MessageEvent, socket: WebSocket) => void;

    abstract onClose: (event: CloseEvent, socket: WebSocket) => void;

    abstract onError: (event: Event, options: InitWebStockOptions) => void;


    onMessage = null;

    onOpen = (event: Event, socket: WebSocket) => {
        this.onMessage = this.routes;
        this.sendHeartbeatPackage(socket);
    };

    /**
     * 发送心跳包
     */
    protected abstract sendHeartbeatPackage: (socket: WebSocket) => void;


}
