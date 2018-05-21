
import {BroadcastEventHolder} from "./BroadcastEventHolder";

/**
 * 广播对象事件
 */
export  interface BroadcastEvent{

    [propName:string]:Array<BroadcastEventHolder>
}
