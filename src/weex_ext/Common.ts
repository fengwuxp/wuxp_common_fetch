import {isWeb} from "../utils/WeexEnvUtil";
/**
 * 自定义common 模块
 */
if (isWeb()) {
    const commonModal: any = {
        /**
         * 打开第三方应用
         * @param packageName 包名：ios则是schemes,并且需要提前配置白名单
         * @param downloadURL 对方应用下载地址
         * @param succ
         * @param fail
         */
        openApp(packageName, downloadURL, succ = () => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 openApp");
        },
        /**
         * 获取客户端版本信息
         * Map<String,Object> map= new HashMap<String, Object>();
         * map.put("versionName",versionName);
         * map.put("versionCode",versionCode);
         * map.put("packageName",getPackageName());
         * @param succ
         * @param fail
         */
        getAppVersionInfo(succ = (params: any) => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 getAppVersionInfo");
            succ({
                versionCode: "1.0",
                versionName: "",
                packageName: ""
            });
        },

        /**
         * 设置页面激活回调
         * @param callback
         */
        setOnActCallback(callback = () => {
        }) {
            console.log("web环境暂不支持 setOnActCallback");
        },


        /**
         * 设置安卓顶部状态栏背景色
         * @param color
         */
        // setGlobalTopStatusBar(color){
        //     console.log("仅支持android环境!");
        // }

        /**
         * 获取缓存大小
         * @param {() => any} callback
         */
        getTempDirSize(callback = (data: any) => {
        }) {
            console.log("web环境暂不支持 getTempDirSize");
            callback({
                seiz: 0,
                format: "0.0"
            })
        },

        /**
         * 清除缓存
         * @param {() => any} callback
         */
        cleanTempDir(callback = () => {
        }) {
            console.log("web环境暂不支持 cleanTempDir");
        },

        /**
         * 获取设备标识
         * @param {(param: string) => any} callback
         */
        getDeviceIdentifier(callback = (param: string) => {
        }) {
            console.log("web环境暂不支持 getDeviceIdentifier");
            callback(new Date().getTime().toString());
        },

        /**
         * 是否安装微信
         */
        isWXInstalled(callback = (isInstall: boolean) => {
        }) {
            return callback(true);
        },

        /**
         * 是否安装qq
         */
        isQQInstalled(callback = (isInstall: boolean) => {
        }) {
            return true;
        },
        /**
         * 是否安装新浪微博
         */
        isSinaWeiboInstalled(callback = (isInstall: boolean) => {
        }) {
            return callback(true);
        },

        /**
         *是否安装新浪微博 sso
         * @param {(isInstall: boolean) => any} callback
         * @returns {boolean}
         */
        isSinaWeiboSSO(callback = (isInstall: boolean) => {
        }) {
            return callback(true);
        },

        /**
         * 获取屏幕相关信息
         * @param success
         */
        getScreenLayoutInfo(success=()=>{} ){
            console.log("web环境暂不支持 getScreenLayoutInfo");
        }

    };
    console.log("注册自定义模块 common");
    weex.registerModule('common', commonModal);
}
