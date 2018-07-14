/**
 * 任务被废弃的异常
 * @author wxup
 * @create 2018-07-13 11:24
 **/
export default class ThrowAwayException extends Error {


    constructor(message?: string) {
        super(message);
    }
}
