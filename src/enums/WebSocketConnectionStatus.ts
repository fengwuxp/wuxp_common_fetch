/**
 * webSocket的连接状态
 * @author wxup
 * @create 2018-10-22 10:42
 **/

export enum WebSocketConnectionStatus {

    //未连接
    NONE,

    //等待连接
    WAITING,

    //连接中
    CONNECTING,

    //重新连接
    RECONNECT,

    //被关闭
    CLOSE



}
