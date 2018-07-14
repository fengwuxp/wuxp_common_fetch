import {TaskManager} from "./TaskManager";
import {Task} from "../Task";
import TimerTask from "./timer/TimerTask";

/**
 * 请求任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/
export default abstract class AbstractTaskManager implements TaskManager {

    /**
     * 任务队列
     * @type {any[]}
     */
    private _taskQueue: Task[] = [];


    push = (task: TimerTask) => {
        this._taskQueue.push(task);
        return this._taskQueue.length;
    };


    remove = (task: TimerTask) => {
        let index = this._taskQueue.indexOf(task);
        if (index >= 0) {
            this._taskQueue.splice(index, 1);
        }
        return this._taskQueue.length;
    };


    get taskQueue(): Task[] {
        return this._taskQueue;
    }



}

