const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({

    company_name : String,
    location : String,
    city: String,
    founded_on : String,
    //company_logo: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    isActive: {
        type: Boolean,
        default: true
    },
});
companySchema.set('timestamps', true)
module.exports = mongoose.mongoose.model("company", companySchema);
