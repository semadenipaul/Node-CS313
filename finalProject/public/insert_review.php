<?php
session_start();
require 'db_connect.php';
$db = get_db();

if (isset($_POST['Submit'])) {
  $review = $_POST['review'];
}

try {
    $previous_parks_visited = 2;
    $insert = $db->prepare('INSERT INTO person_reviews (previous_parks_visited, reviews_content) VALUES (:previous_parks_visited, :reviews_content);');
    $insert->bindValue(':previous_parks_visited', $previous_parks_visited);
    $insert->bindValue(':reviews_content', $review);
    $insert->execute();
} catch (\Throwable $th) {
    echo "<h1>ERROR: User not created! You fail, fool." , $th->getMessage(), "</h1>";
}

?>