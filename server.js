const express = require('express');
const bodyParser = require('body-parser')
const UserDB = require('./models/user');
const userObject = require('./userClass');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
    res.send(`Listening on ${PORT}`);
})

app.get('/user', (req, res) => {
    let user = req.query.user;
    UserDB.find({ user: user }, (err, result) => {
        if (err) throw err;
        if (result[0] === undefined) {
            res.status(400).send('Fail');
        } else {
            res.send(result[0]);
        }

    })
});

app.post('/user', urlencodedParser, (req, res) => {
    const User = new userObject();
    User.user = req.body.user;
    User.email = req.body.email;
    if (User.user === undefined || User.user === "" || User.email === undefined || User.email === "") {
        res.status(400).send('Fail');
    }
    else {
        UserDB.find({ user: User.user }, (err, result) => {
            if (err) throw err;
            if (result[0] === undefined) {
                const arr = [{ user: User.user, email: User.email }];
                UserDB.insertMany(arr, (err, result) => {
                    if (err) throw err;
                    res.status(200).send('DONE');
                })
            } else {
                res.status(400).send('Fail');
            }

        })

    }
});

app.put('/user', (req, res) => {
    let query = { user: req.query.user };
    let doc = { email: req.query.email }
    UserDB.updateOne(query, doc, (err, raw) => {
        if (err) throw err;
        res.send(raw);
    })
})

app.delete('/user', (req, res) => {
    let query = { user: req.query.user };
    UserDB.deleteOne(query, (err) => {
        if (err) throw err;
        res.status(200).send("successful")
    })
});