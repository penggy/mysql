"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mysql = require("mysql");
const events = require("events");
module.exports = class Mysql extends events.EventEmitter {
    constructor(cfg) {
        super();
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: cfg.host,
            user: cfg.user,
            password: cfg.password,
            database: cfg.database,
            port: cfg.port,
            acquireTimeout: 15000,
            multipleStatements: true
        });
    }
    destroy() {
        return new Promise((resolve, reject) => {
            this.pool.end(e => {
                if (e) {
                    reject(e);
                    return;
                }
                resolve();
            });
        });
    }
    get(sql, ...params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (e, results, fields) => {
                if (e) {
                    reject(e);
                    return;
                }
                if (results.length == 0) {
                    resolve(null);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    all(sql, ...params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (e, results, fields) => {
                if (e) {
                    reject(e);
                    return;
                }
                resolve(results);
            });
        });
    }
    run(sql, ...params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (e, result) => {
                if (e) {
                    reject(e);
                    return;
                }
                resolve(result);
            });
        });
    }
    exec(sql) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((e, conn) => {
                if (e) {
                    reject(e);
                    return;
                }
                conn.beginTransaction(e => {
                    if (e) {
                        conn.release();
                        reject(e);
                        return;
                    }
                    conn.query(sql, e => {
                        if (e) {
                            conn.rollback(() => {
                                conn.release();
                                reject(e);
                            });
                            return;
                        }
                        conn.commit(e => {
                            if (e) {
                                conn.rollback(() => {
                                    conn.release();
                                    reject(e);
                                });
                                return;
                            }
                            conn.release();
                            resolve();
                        }); //commit
                    }); //query
                }); //beginTransaction
            }); //getConnection
        });
    }
    page(start, limit, sql, ...params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                var cntSql = sql.replace(/\s*(o|O)(r|R)(d|D)(e|E)(r|R)\s+(b|B)(y|Y).*$/, "");
                cntSql = `select count(*) as count from (${cntSql}) as total`;
                var ret = {};
                var row = yield this.get(cntSql, ...params);
                ret.total = row["count"];
                var pageSql = sql;
                pageSql += " limit ?,?";
                params.push(start, limit);
                ret.rows = yield this.all(pageSql, ...params);
                resolve(ret);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
};
