var orm = require('../config/orm.js')

var burger = {
    selectAll: function(callback){
        orm.selectAll("burgers", function(result){
            callback(result)
        });
    },

    insert: function(columns, values, callback){
        orm.insertOne("burgers", columns, values, function(result){
            callback(result)
        });
    },

    update: function(objColVals, condition, callback){
        orm.updateOne("burgers", objColVals, condition, function(result){
            callback(result)
        });
    }
}

module.exports = burger