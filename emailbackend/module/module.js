const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        to: {
            required: true,
            type: String
        },
        subject: {
            required: true,
            type: String
        },
        body: {
            required: true,
            type: String
        },
        date: {
            type: Date,
            default: Date.now 
        }
    }
);

module.exports = mongoose.model("EmailPost", schema);
