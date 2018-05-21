import {isWeb} from "../utils/WeexEnvUtil";
/**
 * 自定义photo
 * Created by wuxp on 2017/6/6.
 */
if (isWeb()) {

    const thirdLogin:any={
        wxLogin(){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 thirdLogin");
    weex.registerModule('thirdLogin', thirdLogin);
}
