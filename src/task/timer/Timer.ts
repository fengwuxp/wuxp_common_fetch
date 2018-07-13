

export  type TimerHandler=(...args: any[])=>void;

/**
 * 定时器接口定义
 * @author wxup
 * @create 2018-07-13 11:45
 **/
export interface Timer {

      clearInterval(handle?: number): void;

      clearTimeout(handle?: number): void;

      setInterval(handler: TimerHandler, timeout: number): number;

      setInterval(handler: any, timeout?: any, ...args: any[]): number;

      setTimeout(handler: TimerHandler, timeout: number): number;

      setTimeout(handler: any, timeout?: any, ...args: any[]): number;

      clearImmediate(handle: number): void;

      setImmediate(handler: TimerHandler): number;

      setImmediate(handler: any, ...args: any[]): number;
}
