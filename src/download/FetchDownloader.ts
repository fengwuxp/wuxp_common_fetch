import {FetchOption} from "../api/option/FetchOption";
import {DataType} from "../api/enums/DataType";
import FileSaver from "file-saver";
import {isNullOrUndefined} from "util";
import ApiClientFetch from "../api/impl/es/ApiClientFetch";


const apiClient = new ApiClientFetch(null, null);


/**
 * 下载文件
 * 注：使用时注意跨越的限制
 * @param {FetchOption} option
 * @param {string} fileName
 * @returns {Promise<any>}
 */
export function downloadFileByFetch(option: FetchOption, fileName?: string) {

    if (isNullOrUndefined(fileName)) {
        const url = option.url;
        fileName = url.substring(url.lastIndexOf("/"), url.length);
    }

    return apiClient.post({
        ...option,
        dataType: DataType.BLOB,
        useFilter: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }).then((blobData: Blob) => {
        //保存文件
        FileSaver.saveAs(blobData, fileName);
    });
}
