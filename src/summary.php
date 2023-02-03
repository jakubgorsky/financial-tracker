<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/summary.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>
<body>
    <button class="back button" onclick="return_home()">home page</button>
    <div class="container">
        <h1>summary</h1>
        <div class="grid-container" id="charts-container">
            <div id="monthly-expenses-container" class="item">
                <canvas id="monthly-expenses"></canvas>
            </div>
            <div id="monthly-expenses-list" class="item">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>type</th>
                                    <th>descrption</th>
                                    <th>amount</th>
                                    <th>date</th>
                                </tr>
                            </thead>
                            <tbody id="monthly-expenses-table">
                            </tbody>
                        </table>
                    </div>
            </div>
            <div id="chart2-container" class="item">
                <canvas id="chart2"></canvas>
            </div>
            <div id="chart3-container" class="item">
                <canvas id="chart3"></canvas>
            </div>
        </div>
    </div>
    <script>
        function return_home(){
            window.location.href = "../index.html";
        }
    </script>
    <script src="../scripts/charts.js"></script>
</body>