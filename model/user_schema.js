const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    name: String,
    email:String,
    password: String,
    phone_number: String,
    city: String,
    state: String,
    profile_pic : String,
    isActive: {
        type: Boolean,
        default: true
    },
    role :{
        type: String,
        default: "user"
    },  
})
userSchema.set('timestamps', true)
module.exports = mongoose.model("user", userSchema)
