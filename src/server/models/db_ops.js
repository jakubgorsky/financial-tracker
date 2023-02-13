let sqlite = require('sqlite3')
const path = require('path')
// const dbPath = path.resolve(process.resourcesPath, 'app/data/financial_tracker.db')
const dbPath = 'dev/dev.db'
let db = new sqlite.Database(dbPath)

module.exports.getExpenses = function() {

    return new Promise(function(resolve, reject){
        db.serialize(function (){
            db.all('SELECT * FROM expenses', function(err, rows){
                if(!err){
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        })
    })
}

module.exports.getType = function() {
    return new Promise(function(resolve, reject){
        db.serialize(function (){
            db.all('SELECT * FROM type', function(err, rows){
                if(!err){
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        })
    })
}

module.exports.insertExpenses = function(data) {
    return new Promise(function(resolve, reject){
        db.serialize(function (){
            var sql = 'INSERT INTO expenses (type, description, amount, date) VALUES(' + parseInt(data.type) + ', "' + data.desc + '", ' + parseFloat(data.amnt) +", strftime('%Y-%m-%d','"+data.date+"'));";
            console.log(sql);
            db.all(sql, function(err, rows){
                if(!err){
                    resolve(rows)
                    console.log(data);
                } else {
                    reject(err)
                }
            })
        })
    })
}

