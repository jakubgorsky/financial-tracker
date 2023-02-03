<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/add.css">
</head>
<body>
    <button class="back button" onclick="return_home()">home page</button>
    <div class="container">
        <h1>Add an item</h1>
        <form class="form" method="POST">
            <!-- <label for="Type">Type</label><br/> -->
            <select id="Type" name="Type">
                <option value="0">select type</option>
                <option value="13">car</option>
                <option value="1">alcohol</option>
                <option value="2">detergents</option>
                <option value="3">energy drinks</option>
                <option value="4">food</option>
                <option value="5">snacks</option>
                <option value="6">restaurants</option>
                <option value="7">household</option>
                <option value="8">other</option>
                <option value="9">installment</option>
                <option value="11">subscription</option>
                <option value="12">e-cig</option>
                <option value="10">income</option>
            </select><br/>
            <!-- <label for="Desc">description</label><br/> -->
            <input type="text" name="Desc" placeholder="description" autocomplete="off"><br/>
            <!-- <label for="Amount">amount</label><br/> -->
            <input type="number" name="Amount" step="0.01" min="0" placeholder="amount" autocomplete="off"><br/><br/>
            <input type="submit" value="add">
        </form>
        <?php
        if ($_POST) {
            $server = "localhost";
            $username = "financial_tracker";
            $password = "financial_tracker";
            $dbname = "financial_tracker";

            $conn = new mysqli($server, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $type = $_POST["Type"];
            $desc = $_POST["Desc"];
            $amnt = $_POST["Amount"];

            if ($type != 10 && $type != 0) {
                $sql = "INSERT INTO expenses VALUES(0, '$type','$desc','$amnt', CURDATE())";
            } elseif ($type != 0 && $type == 10) {
                $sql = "INSERT INTO incomes VALUES(0, '$desc','$amnt')";
            } else {
                die('<h1 width="20% !important" id="alert">Type cannot be 0!</h1>');
            }
            if (mysqli_query($conn, $sql)) {
                echo '<h1 width="20% !important" id="alert">Added successfully</h1>';
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
            mysqli_close($conn);
        }
        ?>
    </div>
    <script>
        function return_home(){
            window.location.href = "../index.html";
        }
    </script>
</body>