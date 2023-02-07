let express = require('express')
let app = express()
let post = require('./models/expenses')

app.get('/expenses', function(req, res){
    post.getExpenses().then(function (response){
        res.json(response)
    }).catch(function(){
        console.log(response)
    })
})

app.listen(3000, function() {
    console.log('Server is running on port 3000')
})