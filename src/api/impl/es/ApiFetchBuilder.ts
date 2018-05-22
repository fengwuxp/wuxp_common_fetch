import ApiClientFetch from "./ApiClientFetch";
import {ApiBuild} from "../../base/ApiBuild";
import {FetchOption} from "../../option/FetchOption";
import {HttpErrorHandler} from "../../error/HttpErrorHandler";
import FilterHandlerByAsync from "../../filter/handler/FilterHandlerByAsync";
import FetchHttpErrorHandler from "../../error/FetchHttpErrorHandler";


/**
 * ApiFetchBuilder 构建工具
 */
class ApiFetchBuilder extends ApiBuild<ApiClientFetch> {


    private _defaultOptions: FetchOption;

    protected _httpErrorHandler: HttpErrorHandler<Response> = new FetchHttpErrorHandler();

    private constructor() {
        super();
    }

    public static builder() {
        return new ApiFetchBuilder();
    }


    useFilter(value: boolean) {
        return this;
    }

    defaultOptions(value: FetchOption) {
        this._defaultOptions = value;
        return this;
    }

    httpErrorHandler(value: HttpErrorHandler<Response>) {
        this._httpErrorHandler = value;
        return this;
    }


    /**
     * build 客户端请求工具
     * @return {ApiClientFetch}
     */
    public build(): ApiClientFetch {

        return new ApiClientFetch(this._httpErrorHandler,
            new FilterHandlerByAsync(this.defaultFilter),
            this._defaultOptions);
    }
}

export default ApiFetchBuilder;

