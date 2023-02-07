window.$ = window.jQuery = require('jquery')

Chart.defaults.font.family = "'Raleway', sans-serif";

const type = {
    "-1": "undefined",
    1: "alcohol",
    2: "detergents",
    3: "energy drinks",
    4: "food",
    5: "snacks",
    6: "restaurants",
    7: "household",
    8: "other",
    9: "installments",
    10: "income",
    11: "subscriptions",
    12: "e-cig",
    13: "car"
}

function get_current_month_expenses(){
    function runOnComplete(){
        console.log(results);
    }
    var results;
    var complete = false;
    $.ajax({
        method: 'GET',
        async: false,
        url: 'http://localhost:3000/expenses',
        success: function(response) {
            results = response;
            complete = true;
            console.log(results);
        }
    });

    var expenses_labels = []
    var expenses_amounts = []
    var expenses_data = []

    for (i in results){
        console.log(results[i])
        if (results[i].type != 0){
            expenses_labels.indexOf(type[results[i].type]) === -1 ? expenses_labels.push(type[results[i].type]) : function(){return};
            expenses_data.push({type: type[results[i].type], amount: results[i].amount})
        }
    }

    holder = {}

    expenses_data.forEach(function(d) {
        if(holder.hasOwnProperty(d.type)){
            holder[d.type] = parseFloat(holder[d.type]) + parseFloat(d.amount);
        } else {
            holder[d.type] = parseFloat(d.amount);
        }
    });

    for (var item in holder) {
        expenses_amounts.push(holder[item]);
    }

    return [expenses_labels, expenses_amounts, results];
}

temp = get_current_month_expenses();
var expenses_labels = temp[0];
var expenses_amounts = temp[1];
var results_monthly = temp[2];

var total = 0;

for (i in results_monthly){
    $("#monthly-expenses-table").append("<tr><td>"+type[results_monthly[i].type]+"</td><td>"+results_monthly[i].description+"</td><td>"+(parseFloat(results_monthly[i].amount)).toFixed(2)+"</td><td>"+results_monthly[i].date+"</td></tr>");
    total += parseFloat(results_monthly[i].amount);
}
$("#monthly-expenses-table").append("<tr><td colspan='2'><b>total</b></td><td colspan='2'><b>"+total.toFixed(2)+"</b></td></tr>");

const monthly_expenses = $('#monthly-expenses');
new Chart(monthly_expenses, {
type: 'doughnut',
data: {
    labels: expenses_labels,
    datasets: [{
        label: 'zł',
        data: expenses_amounts,
        borderWidth: 1,
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    },
    responsive: true,
    layout: {
        padding: 20
    },
    plugins: {
        title: {
            text: 'monthly expenses (pln)',
            align: 'center',
            display: true,
            position: 'top',
            fullSize: true,
            font: { size: 20+'rem' }
        }
    }
}
});

// var budget_data;

// function get_budget_data(){
//     var budget;
//     var income_result = function() {
//         var temp = null;
//         $.ajax({
//             type: "POST",
//             async: false,
//             global: false,
//             url: "php/summary_operations.php",
//             data: "func=income",
//             cache: false,
//             success: function(response){
//                 temp = JSON.parse(response);
//             }
//         });
//         return temp;
//     }();
//     var income = [];
//     var income_temp = 0;
//     // var i = 0;
//     // while (i < income_result.length){
//     //     for (d in income_result){
//     //         if (income_result[i] == income_result[d].date){
//     //             income_temp += income_result[d];
//     //         }
//     //     }
//     //     i++;
//     // }
//     console.log(income);
//     // var results = function() {
//     //     var temp = null;
//     //     $.ajax({
//     //         type: "POST",
//     //         async: false,
//     //         global: false,
//     //         url: "php/summary_operations.php",
//     //         data: "func=def",
//     //         cache: true,
//     //         success: function(response){
//     //             temp = JSON.parse(response);
//     //         }
//     //     });
//     //     return temp;
//     // }();

//     for (i in results){
//         if(results.type == 0){
//             continue;
//         }
//         //
//     }
//     saving_threshold = []
//     saving_value = 500;
//     for (i in budget_data){
//         saving_threshold.push(saving_value);
//     }
//     return [budget, saving_threshold];
// }

// // var temp_budget = get_budget_data();

budget_data = [{x: '01.02.2023', y: 2736.00}, {x: '02.02.2023', y: 2000.00}, {x: '03.02.2023', y: 1943.54}, {x: '04.02.2023', y: 1870.2}];

saving_threshold = [500, 500, 500, 500];
// var budget_data = temp[0];
// var saving_threshold = temp[1];



const budget = $('#chart2');
new Chart(budget, {
data: {
    datasets: [{
    type: 'line',
    label: 'budget available',
    data: budget_data,
    borderWidth: 3
    }, {
        type: 'line',
        labels: ['saving threshold'],
        data: saving_threshold
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    },
    responsive: true,
    plugins: {
        title: {
            text: 'monthly budget (pln)',
            align: 'center',
            display: true,
            position: 'top',
            fullSize: true,
            font: { size: 20+'rem' }
        }
    },
    maintainAspectRatio: false,
    aspectRatio: 1
}
});

const ctx3 = $('#chart3');
new Chart(ctx3, {
type: 'bar',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: '# of Votes',
    data: [12, 10, 13, 5, 2, 3],
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    },
    responsive: true
}
});