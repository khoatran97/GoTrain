var DAO = require('../fn/dataAccess')

module.exports.loadStation = () => {
    var script = "SELECT * FROM Ga";
    return DAO.load(script);
}