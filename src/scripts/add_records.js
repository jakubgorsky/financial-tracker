window.$ = window.jQuery = require('jquery')
var type_select = $("#Type");
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

async function draw_types() {
    await fetch_types()
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