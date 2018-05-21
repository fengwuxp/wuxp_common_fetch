import {appMain} from "../../../../utils/ExpotrtWeexCustomModel";
import {modal} from "../../../../utils/ExportWeexSdkModel";
import {WeexStreamOption} from "../../../option/WeexStreamOption";
import ApiAbstractFilter from "../../ApiAbstractFilter";

/**
 * 需要判断网络的过滤拦截
 */
export class NeedNetworkFilter extends ApiAbstractFilter {


    constructor() {
        super();
    }

    preHandle(options: WeexStreamOption): boolean | Promise<boolean> {

        return new Promise((resolve = (result: boolean) => {
        }, reject = (params: any) => {
        }) => {
            //获取网络
            appMain.getNetworkType((result) => {
                if (result === 0) {
                    let message = "网络不可用，请检查网络!";
                    modal.toast({message, duration: 2});
                    //TODO 将请求缓存
                    reject(new Error(message));
                    return;
                }
                resolve(true);
            });
        });
    }

}
