/**
 * weex官方提供的模块
 */

import {WeexPickerModule} from "weex/src/sdk/model/picker/";
import {WeexTimerModule} from "weex/src/sdk/model/timer/";
import {WeexAnimationModule} from "weex/src/sdk/model/animation/";
import {WeexClipboardModule} from "weex/src/sdk/model/clipboard/";
import {WeexDomModule} from "weex/src/sdk/model/dom/";
import {WeexGlobalEventModule} from "weex/src/sdk/model/globalEvent/";
import {WeexMetaModule} from "weex/src/sdk/model/meta/";
import {WeexWebviewModule} from "weex/src/sdk/model/webview/";
import {WeexStreamModule} from "weex/src/sdk/model/stream/";
import {WeexStorageModule} from "weex/src/sdk/model/storage";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator/";
import {WeexModalModule} from "weex/src/sdk/model/modal/";
import {WeexWebSocketModule} from "weex/src/sdk/model/webSocket";

if (process.env.IS_WEB) {
    require("../weex_ext/Picker");
    require("../weex_ext/Timer");
}

const animation: WeexAnimationModule = weex.requireModule('animation');
const clipboard: WeexClipboardModule = weex.requireModule('clipboard');
const dom: WeexDomModule = weex.requireModule('dom');
const globalEvent: WeexGlobalEventModule = weex.requireModule('globalEvent');
const meta: WeexMetaModule = weex.requireModule('meta');
const WebSocket: WeexWebSocketModule = weex.requireModule('WebSocket');
const picker: WeexPickerModule = weex.requireModule('picker');
const modal: WeexModalModule = weex.requireModule('modal');
const navigator: WeexNavigatorModule = weex.requireModule('navigator');
const storage: WeexStorageModule = weex.requireModule('storage');
const stream: WeexStreamModule = weex.requireModule('stream');
const webview: WeexWebviewModule = weex.requireModule('webview');

const timer: WeexTimerModule = weex.requireModule("timer");


//此处为了导入地方能够进行结构赋值，不能使用 export default
export {
    animation,
    WebSocket,
    picker,
    clipboard,
    dom,
    modal,
    navigator,
    storage,
    stream,
    webview,
    globalEvent,
    timer,
};

