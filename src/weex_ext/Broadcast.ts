import BroadcastPlugin from "../plugins/broadcast/BroadcastPlugin";
import {isWeb} from "../utils/WeexEnvUtil";

/**
 * 自定义简单的广播对象 (web模块)
 * Created by wuxp on 2017/5/31.
 */
if (isWeb()) {

    const broadcastweex: any = new BroadcastPlugin();
    console.log("注册自定义模块 broadcast");
    weex.registerModule('broadcast', broadcastweex);
}
