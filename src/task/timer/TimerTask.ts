import AbstractTask from "../AbstractTask";
import {Timer, TimerHandler} from "./Timer";

//定时器
let DEFAULT_TIMER: Timer = null;

/**
 * 定时器相关任务
 * @author wxup
 * @create 2018-07-13 11:41
 **/
export default class TimerTask extends AbstractTask {

    private taskType: TimerTaskType;

    private timerId: any;


    private constructor(taskType: TimerTaskType, handler: TimerHandler, timeout: number) {
        super();
        this.taskType = taskType;
        this.createTask(handler, timeout);
    }

    /**
     * 设置定时器
     * @param {Timer} timer
     */
    public static setTimer = (timer: Timer) => {
        DEFAULT_TIMER = timer;
    };

    /**
     * 创建一个执行一次的任务
     * @param {TimerHandler} handler
     * @param {number} timeout
     * @return {TimerTask}
     */
    public static newOnceTask = (handler: TimerHandler, timeout: number) => {
        return new TimerTask(TimerTaskType.ONCE, handler, timeout);
    };

    /**
     * 创建一个循环执行的任务
     * @param {TimerHandler} handler
     * @param {number} timeout
     * @return {TimerTask}
     */
    public static newLoopTask = (handler: TimerHandler, timeout: number) => {
        return new TimerTask(TimerTaskType.LOOP, handler, timeout);
    };


    throwAway = () => {
        if (TimerTaskType.ONCE === this.taskType) {
            DEFAULT_TIMER.clearTimeout(this.timerId);
        } else {
            DEFAULT_TIMER.clearInterval(this.timerId);
        }
    };


    completed = () => {
        this.throwAway()
    };


    /**
     * 创建一个定时任务
     * @param {TimerHandler} handler
     * @param {number} timeout
     */
    private createTask = (handler: TimerHandler, timeout: number) => {

        if (TimerTaskType.ONCE === this.taskType) {
            this.timerId = DEFAULT_TIMER.setTimeout(handler, timeout);
        } else {
            this.timerId = DEFAULT_TIMER.setTimeout(handler, timeout);
        }
    };


}


export enum TimerTaskType {

    //仅一次
    ONCE,

    //循环
    LOOP,

}
