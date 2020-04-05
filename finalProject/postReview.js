const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://dbdtgkttfjxodw:14a7344321dbcb34dd2cff40f203200e5b1a23a09dfb7c14858505efaefa3694@ec2-34-206-252-187.compute-1.amazonaws.com:5432/d4m91levioidkp?ssl=true";

const pool = new Pool({ connectionString: connectionString });

function postReview(req, res) {

    var username = req.session.username;

    getUserFromDB(username, function (error, result) {
        if (error || result == null || result.length != 1) {
            res.status(500).json({ success: false, data: error });
            return;
        }
        else {

            console.log("String from DB: ", result);
            const person = result[0];
            var objectValue = person;

            var id = objectValue['id'];
            var review = req.body.review;
            console.log("review = " + review);

            insertReview(id, review);

            getReviewFromDB(id, function (error, result) {
                if (error || result == null) {
                    res.status(500).json({ success: false, data: error });
                    return;
                }
                else {
                    console.log("String from DB: ", result);
                    var length = result.length;
                    var data = new Array;

                    console.log("length = " + length);
                    for (let i = 0; i < length; i++) {
                        const objectValue = result[i];

                        //var data  = {id: objectValue['id'], user_id: objectValue['person'], review: objectValue['reviews_content']};

                        var id = objectValue['id'];
                        var user_id = objectValue['person'];
                        var review = objectValue['reviews_content'];

                        data.push(review);
                    }

                    console.log("data = " + data);

                    //var params = { id: id, user_id: user_id, review: review };
                    var params = { data: data, length: length };

                    res.render('reviews', params);
                }
            });

        }
    });

}

function getUserFromDB(username, callback) {

    console.log("Getting person from DataBase with username: " + username);
    const sql = "SELECT id, first_name, last_name, person_email, new_person, city, state FROM person WHERE USER_NAME = $1::VARCHAR";

    const params = [username];

    pool.query(sql, params, function (error, res) {
        if (error) {
            console.log("ERROR on query: ");
            console.log(error);
            callback(error, null);
            return;
        }

        console.log("Found result: " + JSON.stringify(res.rows));
        callback(null, res.rows);
    });
}

function insertReview(id, review) {
    try {
        console.log("Inserting Review into DataBase with id: " + id);
        console.log("Inserting Review into DataBase with review: " + review);
        var sql = "INSERT INTO person_reviews (person, reviews_content) VALUES ('" + id + "', '" + review + "')";

        pool.query(sql, function (err, res) {
            if (err) {
                console.log("ERROR inserting review into database!!");
                console.log(err);
                return;
            }
            console.log("SUCCESS! A new review has been inserted into database");
        });

    }
    catch {
        res.redirect('/createReview');
        console.log('Please Try Again!');
    }
}

function getReviewFromDB(id, callback) {
    console.log("Getting person from DataBase with id: " + id);
    const sql = "SELECT id, person, reviews_content FROM person_reviews WHERE person = $1::INT";

    const params = [id];

    pool.query(sql, params, function (error, res) {
        if (error) {
            console.log("ERROR on query: ");
            console.log(error);
            callback(error, null);
            return;
        }

        console.log("Found result: " + JSON.stringify(res.rows));
        callback(null, res.rows);
    });
}

module.exports = { postReview: postReview };