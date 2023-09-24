const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

require("./configs/dotenv");
const client = require("./configs/database");

client.connect((err) => { //Connected Database

    if (err) {

        console.log(err);

    }

    else {

        console.log("Data logging initiated!");
    }

});

const user = require("./routes/user");

app.use("/user", user);

app.get('/', (req, res) => {
    res.status(200).send("Its on")
})

app.listen(port, () => {
    console.log(`Here we go, Engines started at ${port}.`);
})