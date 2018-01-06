# @penggy/mysql

> Promise wrapper of mysql api

## install

npm i @penggy/mysql

## usage

```js
const settings = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'yourpassword',
    database: 'yourdb'
}
const mysql = new (require('./index'))(settings);

(async () => {
    var row = await mysql.get(`select count(*) as cnt from information_schema.tables where table_schema='${settings.database}'`)
    console.log(row.cnt);
    await mysql.destroy();
})()

```

## api

- destroy()

    destroy connections

- get(sql, ...params)

    return first result of sql query with optional params

- all(sql, ...params)

    return all results of sql query with optional params

- run(sql, ...params)

    exec update, insert sql with optional params        

- exec(sql)

    exec mutilple line sql in one transaction

- page(start, limit, sql, ...params)

    pagination sql query with start, limit and optinal params

    return { total: number, rows: array }    


