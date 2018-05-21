var mysql = require('mysql');

module.exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'gotrain'
        });

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        });

        cn.end();
    });
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 8889,
            user: 'root',
            password: 'root',
            database: 'test'
        });

        cn.connect();

        cn.query(sql, values, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }

            cn.end();
        });
    });
}