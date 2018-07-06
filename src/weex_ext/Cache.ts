import {isWeb} from "../utils/WeexEnvUtil";


/**
 * 自定义cache 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (isWeb()) {
    const cacheMap:Map<string,any>=new Map<string, any>();
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
        },
        /*------------------------*/
        setMemCache(key, value) {
            cacheMap.set(key, value)
        },
        getMemCache(key, callback) {
            const result = cacheMap.get(key);
            callback(result);
        },
        removeMemCache(key) {
            return cacheMap.delete(key);
        }
    };
    console.log("注册自定义模块 cache");
    weex.registerModule('cache', cacheWeexModal);
}
