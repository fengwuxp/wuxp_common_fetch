/**
 * 是否为promise对象
 * @param params
 * @return {boolean}
 */
import {isNullOrUndefined} from "util";

const isPromise = (params: any) => {

    if (isNullOrUndefined(params)) {
        return false;
    }

    let name = params.constructor.name;
    //在安卓中 params.constructor.name=Tu
    return name === "Promise" || name === "Tu";
};

export {
    isPromise
}
