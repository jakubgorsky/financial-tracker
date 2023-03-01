window.$ = window.jQuery = require('jquery')
const { TouchBarSegmentedControl } = require('electron');
const Tabulator = require('tabulator-tables')


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
            console.log("[EDIT.JS | FETCH_TYPES | AJAX REQUEST] Successfully fetched types")
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
            console.log("[EDIT.JS | FETCH_EXPENSES | AJAX REQUEST] Successfully fetched expenses")
        }})
    return res;
}

// var typeEditor = async function(cell, onRendered, success, cancel){
//     await fetch_types();
//     var cellValue = cell.getValue();
//     input = document.createElement("select");
//     input.id = "typeSelect";

// }

async function draw_table(){
    var results = await fetch_expenses();

    var table = new Tabulator("#tabulator-container", {
        data:results,
        layout:"fitColumns",
        responsiveLayout:"hide",
        printHeader: true,
        columns: [
            {title: "ID", field: "id", widthShrink: 2, width: 50},
            {title: "Type", field: "type", widthShrink: 1, width: 50, editor:true,},
            {title: "Description", field: "description", widthGrow: 2, editor:true},
            {title: "Amount", field: "amount", widthShrink: 2, editor:true},
            {title: "Date", field: "date", widthGrow: 2, editor:true},
        ],
        pagination: true,
        paginationSize: 8,
        paginationButtonCount: 1,
    });
}

draw_table();