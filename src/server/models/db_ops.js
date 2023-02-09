let sqlite = require('sqlite3')
let db = new sqlite.Database('./data/dev.db')

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

// module.exports.writeExpenses = function() {
//     return new Promise(function(resolve, reject){

//     })
// }
