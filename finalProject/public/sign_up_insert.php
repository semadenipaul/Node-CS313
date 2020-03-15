<?php
// retrieve POST data from the other page
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$new_person = True;
$city = $_POST['city'];
$state = $_POST['state'];

require("db_connect.php");
$db = get_db();

try
{
	$query = 'INSERT INTO person (user_name, password, person_email, new_person, city, state) VALUES (:user_name, :password, :person_email, :new_person, :city, :state)';
	$statement = $db->prepare($query);
	$statement->bindValue(':user_name', $username);
	$statement->bindValue(':password', $password);
    $statement->bindValue(':person_email', $email);
    $statement->bindValue(':new_person', $new_person);
    $statement->bindValue(':city', $city);
    $statement->bindValue(':state', $state);
	$statement->execute();

	$userId = $db->lastInsertId('person_id_seq');
	// insert into database
	
	// SELECT c.relname FROM pg_class c WHERE c.relkind = 'S';   -- display all sequences
	// get id of last inserted row - save in $userId
}
catch (Exception $ex)
{
	echo "Error with DB. Details: $ex";
	die();
}

//header("https://thawing-woodland-23025.herokuapp.com/week04/assign_04/login_index.php");
header("Location: login_index.php/?personId=$userId"); //Sends the data to display.php

die(); 
?>
