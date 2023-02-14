window.$ = window.jQuery = require('jquery')

var type = {}

async function fetch_types() {
    var res;
    var complete = false;
    await $.ajax({
        method: 'GET',
        async: true,
        url: 'http://localhost:3000/types',
        success: function(response) {
            res = response
            complete = true;
            console.log("[CHARTS.JS | FETCH_TYPES | AJAX REQUEST] Successfully fetched types")
        }
    })
    for (i in res){
        type[i] = res[i].type_desc;
    }
    return res;
}

(async () => {
    await fetch_types();
})();

async function fetch_expenses(){
    await fetch_types();
    var complete = false;
    var res;
    await $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/expenses',
        success: function(response) {
            res = response
            complete = true
            console.log("[CHARTS.JS | FETCH_EXPENSES | AJAX REQUEST] Successfully fetched expenses")
        }})
    return res;
}

async function draw_table(){
    var results = await fetch_expenses();

    for (i in results){
        $("#records").append("<tr><td>"+type[results[i].type]+"</td><td>"+results[i].description+"</td><td>"+(parseFloat(results[i].amount)).toFixed(2)+"</td><td>"+results[i].date+"</td><td></td></tr>");
    }
}

draw_table();