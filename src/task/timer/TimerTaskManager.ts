import {TaskManager} from "../TaskManager";
import {Task} from "../Task";
import TimerTask from "./TimerTask";


/**
 * 定时任务管理器
 * @author wxup
 * @create 2018-07-13 11:39
 **/

export default class TimerTaskManager implements TaskManager {

    /**
     * 任务队列
     * @type {any[]}
     */
    private _timerQueue: Task[] = [];


    push = (task: TimerTask) => {
        this._timerQueue.push(task);
        return this._timerQueue.length;
    };


    remove = (task: TimerTask) => {
        let index = this._timerQueue.indexOf(task);
        if (index >= 0) {
            this._timerQueue.splice(index, 1);
        }
        return this._timerQueue.length;
    };


    get timerQueue(): Task[] {
        return this._timerQueue;
    }
}
