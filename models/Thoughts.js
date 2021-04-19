const { Schema, model } = require('mongoose');

function getDate() {
    return Date.now
}

const Reactions = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: getDate
    }
})

const ThoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: 'Thought are Required',
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: getDate
        },

        username: {
            type: String,
            required: true
        },

        reactions: [Reactions]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;