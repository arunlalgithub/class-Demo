const mongoose = require('mongoose')
const User = require("./user_schema");

const reviewSchema = new mongoose.Schema({
    company_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    subject : String,
    company_rating : {
        type: Number,
        default: 0
    },
    date: { type: Date, default: Date.now },
    isActive: {
        type: Boolean,
        default: true
    },

});
reviewSchema.set('timestamps', true)
module.exports = mongoose.mongoose.model("review", reviewSchema);
