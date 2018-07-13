import {TaskManager} from "./TaskManager";
import {Task} from "../Task";

/**
 * 请求任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/
export default abstract class AbstractTaskManager implements TaskManager {
    push: (...args) => number;
    remove: (...args) => number;



}

