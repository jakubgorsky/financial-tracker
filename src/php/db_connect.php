<?php

$server = "localhost";
$username = "financial_tracker";
$password = "financial_tracker";
$dbname = "financial_tracker";

$conn = new mysqli($server, $username, $password, $dbname);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$type = $_POST["Type"];
$desc = $_POST["Desc"];
$amnt = $_POST["Amount"];

if($type != 10){
    $sql = "INSERT INTO expenses VALUES(0, '$type','$desc','$amnt')";
}
elseif ($type != -1){
    $sql = "INSERT INTO incomes VALUES('$desc','$amnt')";
}
else {
    die("Type cannot be -1!");
}

if(mysqli_query($conn, $sql)){
    echo "Added successfully";
}
else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

?>