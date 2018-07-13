import {Task, TaskStatus} from "./Task";


/**
 * 抽象的任务定义
 * @author wxup
 * @create 2018-07-13 11:09
 **/
export default abstract class AbstractTask implements Task {


    /**
     * 任务状态
     */
    protected status: TaskStatus;


    constructor() {
        this.status = TaskStatus.WAIT;
    }

    getTaskStatus = () => this.status;


    /**
     * 是否被中断
     * @return {boolean}
     */
    isInterrupt=():boolean=>{

        return this.status===TaskStatus.INTERRUPT;
    };

    /**
     * 是否被废弃
     * @return {boolean}
     */
    isThrowAway = (): boolean => {

        return this.status === TaskStatus.THROW_AWAY;
    }
}
