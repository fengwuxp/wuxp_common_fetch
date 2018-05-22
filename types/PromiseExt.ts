/**
 * 扩展promise的定义
 */


/**
 * Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，
 * 都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
 * @param onFulfilled
 * @param onRejected
 */
Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason
            }, 0);
        });
};

/**
 * finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
 * @param callback
 * @return {Promise<TResult>|PromiseLike<TResult>|Promise<T>|PromiseLike<TResult|T>|PromiseLike<TResult2|TResult1>|Promise<TResult|T>|any}
 */
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason
        })
    );
};

Promise.prototype.setContext = function (context) {

    this.context = context;
};

Promise.prototype.getContext = function () {

    return this.context;
};

interface Promise<T=any> {

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;


    /**
     *
     * @param {((value: T) => (PromiseLike<TResult1> | TResult1)) | null | undefined} onfulfilled
     * @param {((reason: any) => (PromiseLike<TResult2> | TResult2)) | null | undefined} onrejected
     * @return
     */
    done<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): void;

    /**
     * finally
     * @param {(() => void) | null | undefined} onfinally
     * @return {Promise<T>}
     */
    finally(onfinally?: ((value: T) => void) | undefined | null): Promise<T>


    /**
     * 设置环境上下文
     * @param {C} context
     */
    setContext<C=any>(context: C): void;

    /**
     * 获取环境上文
     * @return {C}
     */
    getContext<C=any>(): C;
}
