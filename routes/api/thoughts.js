const router = require('express').Router();
const { Thoughts, User } = require('../../models');
const { modelName } = require('../../models/Thoughts');

router.get('/', (req, res) => {
    Thoughts.find({})
        .then(dbThoughts => {
            res.json(dbThoughts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/:id", ({ params }, res) => {
    Thoughts.findOne({ _id: params.id })
        .then(dbData => {
            if (!dbData) {
                res.status(404)
                    .json({ message: `No thoughts found with this id: ${params.id}` });
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
    Thoughts.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
});

router.put("/update:id", (req, res) => {
    Thoughts.updateOne({
        _id: req.params.id
    },
        {
            $set: {
                thoughtsText: req.body.thoughtsText
            }
        })
        .catch(err => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
    Thoughts.remove({
        _id: req.params.id
    })
        .catch(err => res.json(err));
});

router.post("/:thoughtId/reactions", (req, res) => {
    Thoughts.findOneAndUpdate({ _id: params.id },
        { $push: { reactions: params.reactionId } })
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

router.delete("/:thoughtId/reactions", (req, res) => {
    Thoughts.findOneAndDelete({ _id: params.id },
        { $pull: { reactions: params.reactionId } })
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
