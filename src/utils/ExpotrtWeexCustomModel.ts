/**
 * 自定义weex模块，需要h5 android ios分别做实现
 */
if (process.env.IS_WEB) {
    require("../weex_ext/Broadcast");
    require("../weex_ext/Cache");
    require("../weex_ext/AppMain");
    require("../weex_ext/ImageLoad");
    require("../weex_ext/MessagagePush");
    require("../weex_ext/Qrcode");
    require("../weex_ext/Common");
    require("../weex_ext/AppUpdate");
    require("../weex_ext/Photo");
    require("../weex_ext/Location");
    require("../weex_ext/ThirdLogin");
}


const broadcast = weex.requireModule("broadcast");  //自定义广播对象
const cache = weex.requireModule("cache");
const appMain = weex.requireModule("appMain");
const imageLoader = weex.requireModule("image");
const msgPush = weex.requireModule("msgPush");
const qrcode = weex.requireModule("qrcode");
const common = weex.requireModule("common");
const appUpdate = weex.requireModule("appUpdate");
const photo = weex.requireModule("photo");
const location = weex.requireModule("location");
const thirdLogin = weex.requireModule("thirdLogin");

//此处为了导入地方能够进行结构赋值，不能使用 export default

export {
    broadcast,
    cache,
    appMain,
    imageLoader,
    msgPush,
    qrcode,
    common,
    appUpdate,
    photo,
    location,
    thirdLogin
}
