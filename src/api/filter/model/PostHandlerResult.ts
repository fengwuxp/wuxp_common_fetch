/**
 * post handler处理结果
 */
export interface PostHandlerResult {

    /**
     * 处理成功
     */
    isSuccess: boolean;

    /**
     *处理完的结果数据
     */
    resp: Array<any>;


}
