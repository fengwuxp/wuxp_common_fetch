/**
 * 图片处理工具类
 * @author wxup
 * @create 2018-07-17 17:25
 **/


import {isFunction, isNullOrUndefined, isString, isUndefined} from "util";

type CompressionImageOptions = {
    //压缩比例
    compression?: number,

    //目标大小
    targetSize?: number;

    //图片大小
    size?: number,


};

/**
 * 图片压缩
 * @param {string | Blob | File} data  图片数据
 * @param {CompressionImageOptions} options
 * @return {Promise<string>}
 */
export async function compressionImageToBase64(data: string | Blob | File, options: CompressionImageOptions): Promise<string> {

    let {compression, targetSize, size} = options;

    if (isNullOrUndefined(compression)) {
        //计算压缩比例
        compression = compressionHelper(size, targetSize)
    }

    //图片 base64字符串数据
    let dataURL: string;
    if (isString(data)) {
        dataURL = data;
    } else {
        dataURL = await  new Promise<string>(resolve => {
            fileOrBlobToDataURL(data, (result: string) => {
                resolve(result);
            });
        });
    }

    //获取图片类型
    let array = dataURL.split(',');
    let type = array[0].match(/:(.*?);/)[1];

    let result: string;
    return await new Promise<string>((resolve, reject) => {
        dataURLToCanvas(dataURL, (canvas: HTMLCanvasElement) => {
            if (isFunction(canvas.toDataURL)) {
                console.log("图片压缩比例", compression);
                //支持 图片压缩
                result = canvas.toDataURL(type, compression);
            } else {
                //不支持图片压缩
                result = dataURL;
            }
            resolve(result)
        });
    });

}


/**
 * 用于计算图片目标的压缩比例
 * @param imageSize  图片大小
 * @param targetSize 压缩的目标大小
 * @return compression ratio （压缩比例，范围为(0，1]，等于1是不处理）
 **/
function compressionHelper(imageSize, targetSize) {
    let compression = 1;

    if (targetSize > imageSize) {
        return compression;
    }

    let x = imageSize;

    while ((x = x / 1.1) > targetSize) {
        compression -= 0.05;
    }
    if (compression < 0.4) {
        return 0.4;
    }
    return compression;

}


/*
* 以下代码来源：https://www.cnblogs.com/jyuf/p/7251591.html
*
* */

// DataURL转Blob对象
export function dataURLToBlob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}


// Blob转canvas
export function blobToCanvas(blob, cb) {
    fileOrBlobToDataURL(blob, function (dataurl) {
        dataURLToCanvas(dataurl, cb);
    });
}

// File/Blob对象转DataURL
function fileOrBlobToDataURL(obj, cb) {
    let a = new FileReader();
    a.readAsDataURL(obj);
    a.onload = function (e: any) {
        cb(e.target.result);
    };
}

// DataURL转canvas
function dataURLToCanvas(dataurl, cb) {
    let canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        cb(canvas);
    };
    img.src = dataurl;
}
