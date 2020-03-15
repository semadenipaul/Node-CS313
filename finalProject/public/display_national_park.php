<?php
session_start();

if (isset($_GET["Submit"])) {
    $username = $_SESSION["username"];
    $password = $_SESSION["password"];
}

require("db_connect.php");
$db = get_db();

$stateParkId = $_GET['stateParkId'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Cabin+Sketch&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index_style_sheets.css">
    <title>| Explore U.S. National Parks</title>
</head>

<body>
    <form action="" method="GET" class="grid-container">
        <div class="item1">
            <h1>Explore U.S. National Parks</h1>
        </div>
        <div class="item2">
            <ul>
                <li><a href="home_page.php">Home Page</a></li>
                <li><a href="">Previous Trips</a></li>
                <li><a href="">Shop</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Logout</a></li>
            </ul>
        </div>
        <div class="item3">
            <?php
            $statement = $db->prepare("SELECT * FROM national_parks_selected WHERE id = :stateParkId");
            $statement->bindValue(':stateParkId', $stateParkId);
            $statement->execute();

            while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                $id = $row['id'];
                $state_id = $row['us_state'];
                /*$national_park = $row['national_park'];
                $image = $row['image'];*/
                    $state = $db->prepare("SELECT us_state FROM national_parks WHERE id = $id");
                    $state->execute();
                    while ($srow = $state->fetch(PDO::FETCH_ASSOC)) {
                        $s = $srow['us_state'];
                    }

                /*echo "$national_park<br><img src=\"$image\">";*/
                echo "Welcome to the wonderful state of '$s'";
            }
            ?>
        </div>
        <div class="item4"></div>
    </form>
</body>

</html>