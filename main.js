const express = require("express");
const app = express();
var fs = require("fs");
const port = 6135;
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function randomAlphaNumeric () {
    return Math.random().toString(36).charAt(2);
};

function createFromPattern (pattern) {
    pattern = pattern.split('');
    return pattern.map(x => x.replace('x', randomAlphaNumeric())).join('');
};

app.post("/api", (req, res) => {
    const uniqueId = createFromPattern('xxxx-xxxx-xxxx-xxxx');
    fs.writeFile(`./${uniqueId}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
            res.send("Error: Can not add object");
        } else {
            res.send(`Object added with id: ${uniqueId}`);
        }
    });
});

app.get("/api/:id", (req, res) => {
    fs.readFile(`./${req.params.id}.json`, (err, data) => {
        if (err) {
            console.log(err);
            res.send("Error: Can not find object at the id: " + req.params.id);
        } else {
            res.send(data);
        }
    });
});

app.put("/api/:id", (req, res) => {
    fs.writeFile(`./${req.params.id}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
            res.send("Error: Can not update object at the id: " + req.params.id);
        } else {
            res.send(`Object updated at id: ${req.params.id}`);
        }
    });
});

app.delete("/api/:id", (req, res) => {
    fs.writeFile(`./${req.params.id}.json`, JSON.stringify({}), (err) => {
        if (err) {
            console.log(err);
            res.send("Error: Can not delete object at the id: " + req.params.id);
        } else {
            res.send(`Object deleted at id: ${req.params.id}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});