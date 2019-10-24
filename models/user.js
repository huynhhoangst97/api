const db = require('../configs/connMongoDB');
const autoIncrement = require('mongoose-auto-increment');
const Schema = db.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const user = db.model('user', userSchema, "user");
module.exports = user;
