/**
 * 任务管理器
 * @author wxup
 * @create 2018-07-13 11:27
 **/

export interface TaskManager {


    push:(...args)=>number;

    remove:(...args)=>number;
}
