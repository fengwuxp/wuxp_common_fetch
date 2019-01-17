import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler, WebSocketMessageHandler} from "./WebSocketHandler";
import {InitWebStockOptions, WebSocketHolder} from "./WebSocketFactory";
import {WebSocketConnectionStatus} from "../enums/WebSocketConnectionStatus";

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


    protected keepHeartbeatTimerId;


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

    /**
     * 默认实现，子类覆盖的时候要注意调用一下 super.onClose();
     * @param event
     * @param socket
     */
    onClose = (event: CloseEvent, socket: WebSocket) => {
        window.clearTimeout(this.keepHeartbeatTimerId);
    };

    /**
     * 默认实现，子类可以自行覆盖
     * @param event
     * @param options
     */
    onError = (event: Event, options: InitWebStockOptions) => {
        // this.onClose(event as any, null);
        //关闭webSocket
        this._webSocketHolder.close();
    };

    onMessage: (event: MessageEvent, socket: WebSocket) => void = null;

    onOpen = (event: Event, socket: WebSocket) => {
        this.onMessage = this.routes;
        this.keepHeartbeat(socket);
    };


    /**
     * 保持心跳状态
     */
    protected keepHeartbeat = (socket: WebSocket) => {

        if (this._webSocketHolder == null) {
            throw  new Error("_webSocketHolder is null,please set");
        }

        const connectionStatus = this._webSocketHolder.getConnectionStatus();

        if (connectionStatus !== WebSocketConnectionStatus.CONNECTING &&
            connectionStatus !== WebSocketConnectionStatus.RECONNECT) {
            //停止心跳发送
            return;
        }

        //随机秒数后发送 随机范围(10-17)
        const number = Math.random() * 10 + 7;

        this.keepHeartbeatTimerId = setTimeout(() => {
            try {
                //发送心跳
                socket.send("h");
                this.keepHeartbeat(socket);
            } catch (e) {
                //重连
                console.error("心跳包发送失败，准备重新连接", e);
                this._webSocketHolder.connection();
            }

        }, Math.floor(number * 1000));
    }


}
