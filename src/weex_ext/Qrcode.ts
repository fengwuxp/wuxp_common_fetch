import {isWeb} from "../utils/WeexEnvUtil";

if (isWeb()) {

    const qrCode:any={

        /**
         * zbar扫码
         * @param hiddenExchange 是否隐藏二维码/条码切换（0，false;1,true）
         * @param hiddenImportPhoto 是否隐藏导入图片（0，false;1,true）
         * @param success
         * @param error
         */
        scanWithZXing:(hiddenExchange:number,hiddenImportPhoto:number,success=()=>{},error=()=>{})=>{
            console.log("调用扫码模块!,web暂不支持");
        },

        /**
         * 使用zbar扫码
         * @param hiddenExchange 是否隐藏二维码/条码切换（0，false;1,true）
         * @param hiddenImportPhoto 是否隐藏导入图片（0，false;1,true）
         * @param success
         * @param error
         */
        scanWithZbar:(hiddenExchange:number,hiddenImportPhoto:number,success=()=>{},error=()=>{})=>{
            console.log("调用扫码模块!,web暂不支持");
        }
    };

    console.log("注册自定义模块 qrcode");
    weex.registerModule('qrcode', qrCode);
}
