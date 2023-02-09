let express = require('express')
let app = express()
let finances = require('./models/db_ops')

app.get('/expenses', function(req, res){
    finances.getExpenses().then(function (response){
        res.json(response)
    }).catch(function(){
        console.log(response)
    })
})

app.get('/types', function(req, res){
    finances.getType().then(function (response){
        res.json(response)
    }).catch(function(){
        console.log(response)
    })
})

app.listen(3000, function() {
    console.log('Server is running on port 3000')
})