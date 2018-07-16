import {TaskManager} from "./TaskManager";
import {Task, TaskStatus} from "./Task";
import TimerTask from "./timer/TimerTask";
import {isFunction, isNumber, isString} from "util";

/**
 * 请求任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/
export default abstract class AbstractTaskManager implements TaskManager {

    /**
     * 任务队列
     * @type {Task[]}
     */
    public taskQueue: Task[] = [];


    push = (task: Task, index?: number) => {
        if (task == null) {
            return this.taskQueue.length;
        }
        if (isNumber(index)) {
            this.taskQueue[index] = task;
        } else {
            this.taskQueue.push(task);
        }
        return this.taskQueue.length;
    };


    remove = (task: Task | string | number) => {
        if (task == null) {
            return this.taskQueue.length;
        }
        let index = -1;
        if (isNumber(task)) {
            index = task;
        } else if (isString(task)) {
            //通过名称查找
            let b = this.taskQueue.some((item, i) => {
                if (!isFunction(item.getTaskName)) {
                    return false;
                }
                index = i;
                return item.getTaskName() === task;
            });
            if (!b) {
                index = -1;
            }
        } else {
            index = this.taskQueue.indexOf(task as Task);
        }
        if (index < 0) {
            return this.taskQueue.length;
        }

        const taskInstance = this.taskQueue[index];
        if (taskInstance == null) {
            return this.taskQueue.length;
        }

        if (taskInstance.getTaskStatus() !== TaskStatus.COMPLETED) {
            //未结束的任务直接放弃
            taskInstance.throwAway();
        }
        this.taskQueue.splice(index, 1);
        return this.taskQueue.length;
    };


}

