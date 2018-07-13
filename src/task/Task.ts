/**
 * 任务
 */
export interface Task {


    getTaskStatus:()=>TaskStatus;

    /**
     * 等待
     */
    wait?:()=>void;

    /**
     * 运行
     */
    run?:()=>void;

    /**
     * 中断
     */
    interrupt?:()=>void;

    /**
     * 丢弃本次任务
     */
    throwAway?:()=>void;

    /**
     * 完成
     */
    completed?:()=>void;
}


/**
 * 任务状态
 */
export enum TaskStatus {

    /**
     * 等待
     */
    WAIT,


    /**
     * 进行中
     */
    PROCESSING,


    /**
     * 中断，表示可以恢复
     */
    INTERRUPT,


    /**
     * 丢弃本次任务
     */
    THROW_AWAY,

    /**
     * 完成
     */
    COMPLETED
}
