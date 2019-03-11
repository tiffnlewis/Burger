var connection = require('../config/connection.js');

function convertObj(obj) {
    var arr = [];
    for (var key in obj) {
      var value = obj[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        // if string with spaces, add quotations
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }


var orm = {
    selectAll: function(table, callback){
        var queryString = "SELECT * FROM " + table + ";"
        connection.query(queryString, function(err, result){
            if(err) throw err;
            callback(result);
        });
    },

    insertOne: function(table, columns, values, callback){
        var queryString = "INSERT INTO " + table;
        queryString += " (" + columns.toString() + ") ";
        queryString += "VALUES (?, ?, ?);"
        console.log(queryString)
        connection.query(queryString, values, function(err, result){
            if(err) throw err;
            callback(result)
        });
    },

    updateOne: function(table, objColVals, condition, callback){
        var queryString = "UPDATE " + table + " SET "
        queryString += convertObj(objColVals)
        queryString += " WHERE " + condition;
        console.log(queryString)
        connection.query(queryString, function(err, result){
            if(err) throw err;
            callback(result)
        });
    }
}

module.exports = orm;