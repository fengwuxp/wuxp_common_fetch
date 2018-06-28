
/**
 * web socket 消息路由
 */
export interface WebSocketMessageRouter {



    /**
     * 进行消息路由
     * @param {MessageEvent} event
     * @param {WebSocket} socket
     */
    routes:( event: MessageEvent,socket: WebSocket)=>void
}
