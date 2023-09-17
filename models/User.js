const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!']
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;