const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://dbdtgkttfjxodw:14a7344321dbcb34dd2cff40f203200e5b1a23a09dfb7c14858505efaefa3694@ec2-34-206-252-187.compute-1.amazonaws.com:5432/d4m91levioidkp?ssl=true";

const pool = new Pool({ connectionString: connectionString });

async function register(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var city = req.body.city;
        var state = req.body.state;
        var username = req.body.username;
        //var password = req.body.password;
        var newUser = 'true';

        console.log("Inserting " + fname + " " + lname + " into the database");
        console.log("HashedPassword = " + hashedPassword);

        var sql = "INSERT INTO person (first_name, last_name, USER_NAME, password, person_email, new_person, city, state) VALUES ('"+ fname + "', '" + lname + "', '" + username + "', '" + hashedPassword + "', '" + email + "', '" + newUser + "', '" + city + "', '" + state + "')";

        pool.query(sql, function(err, res){
            if (err) {
                console.log("ERROR inserting new person into database!!!");
                console.log(err);
            }
            console.log("SUCCESS! A new person has been inserted");
        });
        res.redirect('/login');
    }
    catch {
        res.redirect('/sign_up');
        console.log('Please Try Again!');
    }
}

module.exports = { register: register };