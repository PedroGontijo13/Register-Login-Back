const bcrypt = require('bcryptjs');
const client = require('../configs/database');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, phonenumber, password } = req.body;
    console.log(name, email, phonenumber, password);

    try {
        const data = await client.query('SELECT * FROM users WHERE email= $1;', [email]);
        const arr = data.rows;

        if (arr.length !== 0) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: 'Server error'
                    });
                }

                try {
                    await client.query(
                        'INSERT INTO users (name, email, phonenumber, password) VALUES ($1, $2, $3, $4)',
                        [name, email, phonenumber, hash]
                    );

                    const token = jwt.sign(
                        {
                            email: email
                        },
                        process.env.SECRET_KEY
                    );

                    res.status(200).json({ message: 'User added to database', token });
                } catch (dbErr) {
                    console.error(dbErr);
                    res.status(500).json({
                        error: 'Database error'
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Database error while registering user!'
        });
    }
};
