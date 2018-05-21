import {isWeb} from "../utils/WeexEnvUtil";

/**
 * 自定义appUpdate 模块
 */
if (isWeb()) {
    const appUpdateModal:any = {

        /**
         * 检查更新
         * @param versionData 检查更新接口返回的json
         * @param succ
         * @param fail
         */
        checkVersion(versionData, succ = () => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 openApp");
        }
    };
    console.log("注册自定义模块 appUpdate");
    weex.registerModule('appUpdate', appUpdateModal);
}
