const router = require('express').Router();
const { User } = require('../../models');

// Retrieve all users
router.get('/', (req, res) => {
    User.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/:id", ({ params }, res) => {
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

router.post("/add", (req, res) => {
    User.create(req.body)
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
});

router.put("/update:id", (req, res) => {
    User.updateOne({
        _id: req.params.id
    },
        {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        })
        .catch(err => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
    User.remove({
        _id: req.params.id
    })
        .catch(err => res.json(err));
});

router.post("/:id/friends/:friendId", ({ params }, res) => {
    User.findOneAndUpdate({ _id: params.id },
        { $push: { friends: params.friendId } })
        .then(dbData => {
            if (!dbData) {
                res.status(404)
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});

router.delete("/:id/friends/:friendId", ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id },
        { $pull: { friends: params.friendId } })
        .then(dbData => {
            if (!dbData) {
                res.status(404)
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});

module.exports = router