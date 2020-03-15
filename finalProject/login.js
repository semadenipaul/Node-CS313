//const { Pool } = require('pg');

//const connectionString = process.env.DATABASE_URL || "postgres://dbdtgkttfjxodw:14a7344321dbcb34dd2cff40f203200e5b1a23a09dfb7c14858505efaefa3694@ec2-34-206-252-187.compute-1.amazonaws.com:5432/d4m91levioidkp?ssl=true";

//const pool = new Pool({ connectionString: connectionString });

function login(req, res) {

    console.log("Validation is being called!!!!")

    /*const id = req.query.id;

    getUserFromDB(id, function (error, result) {
        if (error || result == null || result.length != 1) {
            res.status(500).json({ success: false, data: error });
        }
        else {
            const person = result[0];
            res.status(200).json(person);
        }
    });*/
}

function getUserFromDB(id, callback) {
   /* console.log("Getting person from DataBase with id: " + id);

    const sql = "SELECT first_name, last_name, person_email, new_person, city, state FROM person WHERE id = $1::int";

    const params = [id];

    pool.query(sql, params, function (error, res) {
        if (error) {
            console.log("ERROR on query: ");
            console.log(error);
            callback(error, null);
        }

        console.log("Found result: " + JSON.stringify(res.rows));
        callback(null, res.rows);
    });*/
}

module.exports = {userLogin: userLogin};