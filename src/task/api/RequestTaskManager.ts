import {TaskManager} from "../TaskManager";
import {Task} from "../Task";

/**
 * 请求任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/
class RequestTaskManager implements TaskManager {


    protected taskMap: Map<string, Task[]> = new Map<string, Task[]>();

    /**
     * 加入一个任务到任务队列中
     * @param {string} taskQueueName 队列名称
     * @param {Task} task  任务
     * @return {number}  任务队列长度
     */
    public push = (taskQueueName: string, task: Task): number => {

        const queue = this.taskMap.get(taskQueueName) || [];
        queue.push(task);
        return queue.length;
    };


    /**
     * 从任务队列中移除一个任务
     * @param {string} taskQueueName 队列名称
     * @param {Task} task 任务
     * @return {number}  任务队列的长度
     */
    public remove = (taskQueueName: string, task: Task): number => {
        const queue = this.taskMap.get(taskQueueName) || [];
        let index = queue.indexOf((item) => {
            return item === task;
        });
        if (index > -0) {
            queue.splice(index, 1);
        }
        return queue.length;

    }

}

export default new RequestTaskManager();
