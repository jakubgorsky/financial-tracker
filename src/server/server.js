let express = require('express')
let app = express()
let finances = require('./models/db_ops')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

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

app.post('/add_expenses', function(req, res) {
    finances.insertExpenses(req.body).then(function (response){
        res.json(response)
    }).catch(function(e){
        console.log(e)
    })
})