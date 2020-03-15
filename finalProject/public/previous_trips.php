<?php
session_start();

if (isset($_POST['Submit'])) {
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['password'] = $_POST['password'];
}

require("db_connect.php");
$db = get_db();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Cabin+Sketch&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="previous_trips_style_sheets.css">
    <title>| Welcome</title>
</head>

<body>
    <form action="insert_review.php" method="POST" class="grid-container">
        <div class="item1">
            <h1>Explore U.S. National Parks</h1>
        </div>
        <div class="item2">
            <ul>
                <li><a href="home_page.php">Home Page</a></li>
                <li><a href="login_index.php">Find a New Trip</a></li>
                <li><a href="">Previous Trips</a></li>
                <li><a href="">Logout</a></li>
            </ul>
        </div>
        <div class="item3">
            <?php
            $username = $_SESSION['username'];
            echo "Username = " . $username . " :)<br>";

            $query = "SELECT * FROM person WHERE user_name = '$username'";
            $usr = $db->prepare($query);

            $usr->execute();

            while ($row = $usr->fetch(PDO::FETCH_ASSOC)) {
                $id = $row['id'];
                $user_name = $row['user_name'];
                $newPerson = $row['new_person'];

                /*echo "Welcome $user_name it is $newPerson that you are a new customer with id of $id. <br>";*/

                if ($newPerson == 1) {
                    echo "Welcome to Explore U.S. National Parks. <br> You must first go on a trip before you can write a review.";
                }
                else {
                    echo "<p>Write a review for the National Parks you have visited!</p>
                          <input type=\"button\" name=\"answer\" value=\"Write a Review\" onclick=\"myFunction()\"><br>
                          <textarea class=\"hide\" id=\"review\" name=\"review\" value=\"\" cols=\"100\" rows=\"10\"></textarea>
                          <button class=\"hide\" name=\"Submit\" id=\"save\" value=\"Submit\">Save Review</button>";
                }
                
            }

            ?>
            
        </div>
        <div class="item4"></div>
    </form>
    <script src="previous_trips.js"></script>
</body>

</html>