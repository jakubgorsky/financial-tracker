window.$ = window.jQuery = require('jquery')
var type_select = $("#Type");
var amount = $("#amnt");
var description = $("#desc");
var type = {}
var date = $("#date");
var newType = $("#new-type");

$(function() {
    setDefaultDate();
});

async function addTypes() {
    var select = $("#Type");
    var add = $("#add-type");
    var save = $("#save-type");
    var empty = false;
    console.log(newType.val());
    if (newType.val() == ''){
        newType.css({"outline": "2px solid red", "background-color": "rgba(255,50,50,0.1)"})
        empty = true;
    }
    if (!empty){
        newType.css("visibility", "hidden");
        select.css("visibility", "visible");
        add.css("visibility", "visible");
        save.css("visibility", "hidden");
        await $.ajax({
            method: 'POST',
            async: true,
            data: "type_desc="+newType.val(),
            contentType: "application/x-www-form-urlencoded",
            url: 'http://localhost:3000/add_type',
            success: function(response) {
                res = response
                complete = true;
                $("#info-text").text("Added record successfully")
                console.log("[ADD_RECORDS.JS | INSERT_VALUES | AJAX REQUEST] Successfully inserted expenses")
            },
            error: function(response) {
                res = response
                complete = true;
                $("#info-text").text(response)
                console.log("[ADD_RECORDS.JS | INSERT_VALUES | AJAX REQUEST] An error occured: " + response);
            }
        })
        await draw_types();
    }
}

function showTypeAddition() {
    var select = $("#Type");
    var add = $("#add-type");
    var save = $("#save-type");
    select.css("visibility", "hidden");
    newType.css("visibility", "visible");
    add.css("visibility", "hidden");
    save.css("visibility", "visible");
    newType.val('');
}

$("form").on("submit", async function(e) {
    e.preventDefault();
    var empty = false;
    var type_input = $("#Type");
    var desc_input = $("#desc");
    var amnt_input = $("#amnt");
    if (type_input.val() == ''){
        type_input.css({"outline": "2px solid red", "background-color": "rgba(255,50,50,0.1)"})
        empty = true;
    }
    if (desc_input.val() == ''){
        desc_input.css({"outline": "2px solid red", "background-color": "rgba(255,50,50,0.1)"})
        empty = true;
    }
    if (amnt_input.val() == '' || amnt_input.val() == 0){
        amnt_input.css({"outline": "2px solid red", "background-color": "rgba(255,50,50,0.1)"})
        empty = true;
    }
    if (!empty){
        var info = $("#info");
        info.addClass("show");
        setTimeout(function() {info.removeClass("show");}, 3000);
        var data = {
            "type": type_select.val(),
            "desc": description.val(),
            "amnt": amount.val(),
            "date": date.val(),
        }
        $("#submit").css({"outline": "none", "background-color": "none"});
        type_select.val(0)
        description.val('')
        amount.val('')
        await $.ajax({
            method: 'POST',
            async: true,
            data: "type="+data.type+"&desc="+data.desc+"&amnt="+data.amnt+"&date="+data.date,
            contentType: "application/x-www-form-urlencoded",
            url: 'http://localhost:3000/add_expenses',
            success: function(response) {
                res = response
                complete = true;
                $("#info-text").text("Added record successfully")
                console.log("[ADD_RECORDS.JS | INSERT_VALUES | AJAX REQUEST] Successfully inserted expenses")
            },
            error: function(response) {
                res = response
                complete = true;
                $("#info-text").text(response)
                console.log("[ADD_RECORDS.JS | INSERT_VALUES | AJAX REQUEST] An error occured: " + response);
            }
        })
    }
});

type_select.on("change", function() {
    type_select.css({"outline": "none", "background-color": "rgba(0,0,0,0)"})
})

amount.on("keyup", function() {
    amount.css({"outline": "none", "background-color": "rgba(0,0,0,0)"})
})

description.on("keyup", function() {
    description.css({"outline": "none", "background-color": "rgba(0,0,0,0)"})
})

newType.on("keyup", function() {
    newType.css({"outline": "none", "background-color": "rgba(0,0,0,0)"})
})


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

async function draw_types() {
    await fetch_types()
    type_select.text("");
    for (i in type){
        if (i != 0){
            type_select.append("<option value='" + i + "'>" + type[i] + "</option>");
        } else {
            type_select.append("<option value='0'>select type...</option>");
        }
    }
}

(async () => {
    await draw_types()
})();

function setDefaultDate() {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    date.val(today);
}