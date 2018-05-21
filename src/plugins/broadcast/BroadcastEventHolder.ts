

/**
 * 广播注册事件对象持有者
 */
export interface BroadcastEventHolder {

    /**
     * 成功广播回调
     */
    success: Function,

    /**
     * 失败广播回调
     */
    error: Function
}