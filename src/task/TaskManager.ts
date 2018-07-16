import {Task} from "./Task";

/**
 * 任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/
export interface TaskManager {

    taskQueue: Task[];

    /**
     * 添加一个任务
     * @param args
     * @return {number}
     */
    push: (...args) => number;

    /**
     * 移除任务
     * @param args
     * @return {number}
     */
    remove: (...args) => number;
}
