const bcrypt = require("bcrypt");
const client = require('../configs/database');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, phonenumber, password } = req.body;
    console.log(name, email, phonenumber, password);

    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const arr = data.rows;

        if (arr.length !== 0) {
            return res.status(400).json({
                error: "Email already exists"
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "Server error"
                    });
                }

                const user = {
                    name,
                    email,
                    phonenumber,
                    password: hash,
                };

                client.query(`INSERT INTO users (name, email, phonenumber, password) VALUES ($1, $2, $3, $4)`, [user.name, user.email, user.phonenumber, user.password], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        });
                    } else {
                        const token = jwt.sign(
                            {
                                email: user.email
                            },
                            process.env.SECRET_KEY
                        );

                        res.status(200).json({ message: 'User added to database', token });
                    }
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registering user!"
        });
    }
};
