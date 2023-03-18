const express = require("express");
const app = express();

let account_manager = new Map();
account_manager.set('user123', {
    username: 'user123',
    email: 'user123@email.com',
    password: 'password123'
})

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/home.html");
});

app.get("/registration", function (req, res) {
    res.sendFile(__dirname + "/html/registration.html");
});

app.get("/forgot", function (req, res) {
    res.sendFile(__dirname + "/html/forgot.html");
});

app.post("/api/registration", function (req, res) {
    //Store user details in map....
    account_manager.set(req.body.username, {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    res.sendStatus(202);
});

app.post("/api/login", function (req, res) {
    if (account_manager.has(req.body.username) && account_manager.get(req.body.username).password === req.body.password) {
        res.send("Login Successful.");
    }
    else {
        res.status(401).send("Login failed.");
    }
});

app.post("/api/forgot", function (req, res) {
    console.log(req.body);
    if (account_manager.has(req.body.username) && account_manager.get(req.body.username).email === req.body.email) {
        res.contentType('application/json').send({
            password: account_manager.get(req.body.username).password
        });
    }
    else {
        res.status(401).send("User does not exist");
    }

});


app.listen(3000, function () {
    console.log("Server is running on port 3000..");
});
