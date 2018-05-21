/**
 * 精确进行加减乘除计算
 */
export default class CalculateUtil {

    /**
     * 加法函数，用来得到精确的加法结果
     * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     * @param {number} p1 第一个加数
     * @param {number} p2 第二个加数
     * @param {number} d  要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
     * @return {number}
     */
    public static add = (p1: number, p2: number, d: number = 0): number => {
        let arg1: string = p1.toString();
        let arg2: string = p2.toString();
        let arg1Arr: Array<string> = arg1.split("."),
            arg2Arr: Array<string> = arg2.split("."),
            d1: string = arg1Arr.length === 2 ? arg1Arr[1] : "",
            d2: string = arg2Arr.length === 2 ? arg2Arr[1] : "";
        let maxLen: number = Math.max(d1.length, d2.length);
        let m: number = Math.pow(10, maxLen);
        let result: number = Number(((p1 * m + p2 * m) / m).toFixed(maxLen));
        return d > 0 ? Number((result).toFixed(d)) : result;
    };

    /**
     * 减法函数，用来得到精确的减法结果
     * @param {number} p1
     * @param {number} p2
     * @param {number} d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
     * @return {number}
     */
    public static sub = (p1: number, p2: number, d: number = 0): number => {
        return CalculateUtil.add(p1, -p2, d);
    };

    /**
     * 乘法函数，用来得到精确的乘法结果
     * @param {number} p1 第一个乘数
     * @param {number} p2 第二个乘数
     * @param {number} d  要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
     * @return {number}
     */
    public static mul = (p1: number, p2: number, d: number = 0): number => {
        let r1: string = p1.toString(),
            r2: string = p2.toString();
        let r1Array: Array<string> = r1.split(".");
        let r2Array: Array<string> = r2.split(".");
        let m: number = (r1Array[1] ? r1Array[1].length : 0) + (r2Array[1] ? r2Array[1].length : 0);
        let resultVal: number = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
        return d > 0 ? Number(resultVal.toFixed(d)) : resultVal;
    };

    /**
     * 除法函数，用来得到精确的除法结果
     * @param {number} p1 除数
     * @param {number} p2 被除数
     * @param {number} d  要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
     * @return {number}
     */
    public static div = (p1: number, p2: number, d: number = 0): number => {
        let r1: string = p1.toString(),
            r2: string = p2.toString();
        let r2Array: Array<string> = r2.split(".");
        let r1Array: Array<string> = r1.split(".");
        let m: number = (r2Array[1] ? r2Array[1].length : 0) - (r1Array[1] ? r1Array[1].length : 0);
        let resultVal: number = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
        return d > 0 ? Number(resultVal.toFixed(d)) : resultVal;
    }
}
