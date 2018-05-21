/**
 * Iterator模拟
 * 不严谨的
 */
export default class Iterator<T> {

    private list: Array<T>;

    private index: number;


    constructor(list: Array<T>) {
        this.list = list;//Object.assign([], list);
        this.index = 0;
    }

    public hasNext = (): boolean => {
        return this.list.length > this.index;
    };

    public next = (): T => {

        return this.list[this.index++];
    }
}