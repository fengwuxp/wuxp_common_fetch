import {isWeb} from "../utils/WeexEnvUtil";


/**
 * 自定义cache 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (isWeb()) {
    const cacheWeexModal :any= {
        setCache(key, value) {
            localStorage.setItem(key, value)
        },
        getCache(key, callback) {
            const result = localStorage.getItem(key);
            callback(result);
        },
        removeCache(key) {
            return localStorage.removeItem(key);
        }
    };
    console.log("注册自定义模块 cache");
    weex.registerModule('cache', cacheWeexModal);
}
