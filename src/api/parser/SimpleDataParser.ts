import {DataParser} from "./DataParser";
import {ApiResp} from "../model/ApiResp";


/**
 * 简单的数据解析器
 */
export default class SimpleDataParser<T=any> implements DataParser<ApiResp<T>, T> {


    parser = (data: ApiResp<T>): T => {

        return data.data;
    };


}
