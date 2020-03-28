const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://dbdtgkttfjxodw:14a7344321dbcb34dd2cff40f203200e5b1a23a09dfb7c14858505efaefa3694@ec2-34-206-252-187.compute-1.amazonaws.com:5432/d4m91levioidkp?ssl=true";

const pool = new Pool({ connectionString: connectionString });


function login(req, res) {

    console.log("Validation is being called!!!!")

    var username = req.session.username;
    var password = req.session.password;

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
            var fname = objectValue['first_name'];
            var lname = objectValue['last_name'];
            var email = objectValue['person_email'];
            var newUser = objectValue['new_person'];
            var city = objectValue['city'];
            var state = objectValue['state'];

            var params = { id: id, fname: fname, lname: lname, email: email, newUser: newUser, city: city, state: state };

            res.render('login_index', params);

            
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

module.exports = { login: login };