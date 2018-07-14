import {TaskManager} from "../../task/TaskManager";

//api 任务管理器
const API_TASK_MANAGER: Map<string/*管理器标识*/, TaskManager> = new Map<string, TaskManager>();

/**
 * api任务管理
 * @author wxup
 * @create 2018-07-14 14:36
 **/
export default class ApiTaskManager {


    /**
     * 添加一个api管理器
     * @param {string} taskName  管理器名称
     * @param {TaskManager} taskManger 管理器
     */
    public static pushTaskManger = (taskName: string, taskManger: TaskManager) => {
        API_TASK_MANAGER.set(taskName, taskManger);
    };

    /**
     * 移除一个管理器
     * @param {string} taskName
     */
    public static removeTaskManger = (taskName: string) => {
        API_TASK_MANAGER.delete(taskName);
    }
}
