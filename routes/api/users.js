const router = require('express').Router();
const { User } = require('../../models');

// Retrieve all users
app.get('/users', (req, res) => {
    User.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/users:id", (req, res) => {
    User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbData => {
            if (!dbData) {
                res.status(404)
                    .json({ message: `No user found with this id: ${params.id}` });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});