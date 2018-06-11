var mysql = require('mysql');

module.exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            post: 3306,
            user: 'root',
            password: '',
            database: 'GoTrain'
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

exports.save = (sql, values) => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'GoTrain'
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