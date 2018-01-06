/// <reference types="node" />
import * as mysql from 'mysql';
import * as events from 'events';
declare const _default: {
    new (cfg: {
        host: string;
        user: string;
        password: string;
        database: string;
        port: number;
    }): {
        pool: mysql.Pool;
        destroy(): Promise<void>;
        get(sql: string, ...params: any[]): Promise<any>;
        all(sql: string, ...params: any[]): Promise<any[]>;
        run(sql: string, ...params: any[]): Promise<any>;
        exec(sql: string): Promise<void>;
        page(start: number, limit: number, sql: string, ...params: any[]): Promise<{
            total: number;
            rows: any[];
        }>;
        addListener(event: string | symbol, listener: (...args: any[]) => void): any;
        on(event: string | symbol, listener: (...args: any[]) => void): any;
        once(event: string | symbol, listener: (...args: any[]) => void): any;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        emit(event: string | symbol, ...args: any[]): boolean;
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    };
    listenerCount(emitter: events.EventEmitter, event: string | symbol): number;
    defaultMaxListeners: number;
    EventEmitter: typeof events.EventEmitter;
};
export = _default;
