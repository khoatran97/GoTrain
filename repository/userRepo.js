var DAO = require('../fn/db.js')

module.exports.loadAll = () => {
    var script = 'select * from User';
    return DAO.load(script);
}

module.exports.loadByUsername = (username) => {
    var script = "select * from User where username='"+username+"'";
    return DAO.load(script);
}