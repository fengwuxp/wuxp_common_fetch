import {WebSocketMessageRouter} from "./WebSocketMessageRouter";
import {WebSocketLifeCycleHandler} from "./WebSocketHandler";
import {InitWebStockOptions} from "./WebSocketFactory";
import {WebSocketMessageHandler} from "./WebSocketHandler";

/**
 *
 * @author wxup
 * @create 2018-06-25 12:58
 **/
export default abstract class WebSocketAbstractRouter implements WebSocketMessageRouter, WebSocketLifeCycleHandler {

    protected messageHandler: WebSocketMessageHandler;

    constructor(...handlers: WebSocketMessageHandler[]) {
        let handler = {};
        //合并
        handlers.forEach(item => (Object.assign(handler, item)));
        this.messageHandler = handler;
    }

    abstract routes: (event: MessageEvent, socket: WebSocket) => void;

    abstract onClose: (event: CloseEvent, socket: WebSocket) => void;

    abstract onError: (event: Event, options: InitWebStockOptions) => void;

    onMessage = this.routes;

    onOpen = (event: Event, socket: WebSocket) => {

    }


}
