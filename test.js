const settings = {
    host: '121.40.50.44',
    port: 3306,
    user: 'cloudss',
    password: 'cloudss2017',
    database: 'cloudss'
}
const mysql = new (require('./index'))(settings);

(async () => {
    var row = await mysql.get(`select count(*) as cnt from information_schema.tables where table_schema='${settings.database}'`)
    console.log(row.cnt);
    await mysql.destroy();
})()