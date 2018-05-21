import ApiAbstractFilter from "../../ApiAbstractFilter";
import {appMain} from "../../../../utils/ExpotrtWeexCustomModel";
import {WeexStreamOption} from "../../../option/WeexStreamOption";
import {ApiResp} from "../../../model/ApiResp";


/**
 * 进度条计数器，用于在同时发起多个请求时，统一控制加载进度条
 * @type {number}
 */
let PROGRESSBAR_COUNT: number = 0;

/**
 * 需要使用请求进度条
 */
export class NeedProgressBarFilter extends ApiAbstractFilter<WeexStreamOption> {


    preHandle(options: WeexStreamOption): boolean | Promise<boolean> {
        if (options.useProgressBar) {
            if (PROGRESSBAR_COUNT === 0) {
                //显示加载进度条
                appMain.showProgressBar(20, () => {
                });
            }
            //计数器加一
            PROGRESSBAR_COUNT++;
        }
        return true
    }


    postHandle(data: ApiResp, options: WeexStreamOption): boolean {
        if (options.useProgressBar) {
            //计数器减一
            PROGRESSBAR_COUNT--;
            if (PROGRESSBAR_COUNT === 0) {
                //隐藏加载进度条
                appMain.hideProgressBar();
            }
        }
        return true
    }
}
