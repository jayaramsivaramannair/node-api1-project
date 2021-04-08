// BUILD YOUR SERVER HERE
// use npm run server to start the server as nodemon has been installed
const express = require("express")
const db = require("./users/model.js")

const server = express();

//required to parse incoming JSON request data
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello World to Everyone!" })
})

server.get("/api/users", (req, res) => {
    //since a promise is being returned from find function --- use then and catch
    db.find()
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
            console.log(err)
        })
})

server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
        .then((response) => {
            (response) ?
                res.json(response) :
                res.status(400).json({
                    message: "The user with the specified ID does not exist"
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
            console.log(err)
        })
})

server.post("/api/users", (req, res) => {
    //Checks whether the user object had name or bio properties
    if (!(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('bio'))) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        const newUser = { name: req.body.name, bio: req.body.bio }
        db.insert(newUser)
            .then((response) => {
                res.status(201).json(response)
            })
            .catch((err) => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database"
                })
            })
    }
})

server.delete("/api/users/:id", (req, res) => {
    db.remove(req.params.id)
        .then((response) => {
            if (!response) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(response)
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "The user could not be removed"
            })
            console.log(err)
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
