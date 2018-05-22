import ApiClientWeex from "./ApiClientWeex";
import {ApiBuild} from "../../base/ApiBuild";
import FilterHandlerByAsync from "../../filter/handler/FilterHandlerByAsync";


/**
 * ApiWeexBuild 构建工具
 */
class ApiWeexBuild extends ApiBuild<ApiClientWeex> {


    constructor() {
        super();
    }

    /**
     * build 客户端请求工具
     * @return {ApiClientWeex}
     */
    public build(): ApiClientWeex {

        return new ApiClientWeex(null, new FilterHandlerByAsync(this.defaultFilter));
    }
}

export default new ApiWeexBuild();
