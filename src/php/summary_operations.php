<?php
    function get_current_monthly_expenses()
    {
        $server = "localhost";
        $username = "financial_tracker";
        $password = "financial_tracker";
        $dbname = "financial_tracker";
        $conn = new mysqli($server, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM expenses "; //WHERE MONTH(date) = MONTH(CURDATE());";

        $result = $conn->query($sql);

        $result_arr = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $result_arr[] = $row;
            }
        }
        echo json_encode($result_arr);
        mysqli_close($conn);
    }
    function get_income()
    {
        $server = "localhost";
        $username = "financial_tracker";
        $password = "financial_tracker";
        $dbname = "financial_tracker";
        $conn = new mysqli($server, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM incomes "; //WHERE MONTH(date) = MONTH(CURDATE());";

        $result = $conn->query($sql);

        $result_arr = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $result_arr[] = $row;
            }
        }
        echo json_encode($result_arr);
        mysqli_close($conn);
    }

    function foo(){
        return;
    }

    switch ($_POST["func"]){
        case "monthly":
            get_current_monthly_expenses();
            break;
        case "income":
            get_income();
            break;
        default:
            foo();
            break;
    }
?>