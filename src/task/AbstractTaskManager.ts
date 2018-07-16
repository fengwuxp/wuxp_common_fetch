import {TaskManager} from "./TaskManager";
import {Task, TaskStatus} from "./Task";
import TimerTask from "./timer/TimerTask";

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


    push = (task: Task) => {
        if (task == null) {
            return this.taskQueue.length;
        }
        this.taskQueue.push(task);
        return this.taskQueue.length;
    };


    remove = (task: Task) => {
        if (task == null) {
            return this.taskQueue.length;
        }
        let index = this.taskQueue.indexOf(task);

        if (task.getTaskStatus() !== TaskStatus.COMPLETED) {
            //未结束的任务直接放弃
            task.throwAway();
        }
        if (index >= 0) {
            this.taskQueue.splice(index, 1);
        }
        return this.taskQueue.length;
    };


}

