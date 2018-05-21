import {isWeb} from "../utils/WeexEnvUtil";

if (isWeb()) {

    const timer: any = {
        setTimeout: (callback = () => {
        }, times = 10) => {
            return setTimeout(callback, times)
        },
        clearTimeout(timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    console.log("注册自定义模块 timer");
    weex.registerModule('timer', timer);
}
