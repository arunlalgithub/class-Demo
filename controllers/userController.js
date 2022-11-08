const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../model/user_schema");
const userSchema = require('../model/user_schema')


const userLogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
        //Generate jwt
       const saved_user= await User.findOne({ email : email})
       const token = jwt.sign({userID:user._id},
       process.env.JWT_SECRET_KEY, {expiresIn: '5d'} )
          res.send({ status: "success", message: " Login Success",
         "token" : token });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not valid",
          });
        }
      } else {
        res.send({ status: "failed", message: "You are not a register user" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const new_user = new userSchema(req.body);
    // const salt = await bcrypt.genSalt(10);
    //let user = new User(req.body);
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.json({ status: 400, error: "User already exit" });
    }

    const salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(password, salt);
    let result = await new_user.save();
    //Generate jwt
    const saved_user= await User.findOne({ email : email})
    const token = jwt.sign({userID:saved_user._id},
      process.env.JWT_SECRET_KEY, {expiresIn: '5d'} )

    result = result.toObject();
    delete result.password;
    return res.json({ status: 200, error: "Registration Sucessfull", 
      "token" : token});
  } catch (err) {
    res.send({
      status: 401,
      result: "Something went wrong Please try after some time",
    });
    console.log(err);
  }
};

//change password( MEans already knwo but wnat to change)
const changePassword = async (req,res) =>{
   const { password, confirm_password} = req.body
   if(password && confirm_password ){
     if(password !== confirm_password){
      return res.json({ status: "failed",
        error: "password & New password does't match"});
     }else{
         const salt = await bcrypt.genSalt(10);
        var new_password = await bcrypt.hash(password, salt);
         console.log(req.user);
         console.log((req.user._id));
         await User.findByIdAndUpdate(req.user._id, {$set : 
          { password : new_password }})
         return res.json({ status: "Success", 
           "message": "Password changed Sucessfully"});
     }
   }else{
    return res.json({ status: "failed", error: "All Fields are Required"});
   }
}


module.exports = {
  userLogin,
  userSignup,
  changePassword,
};
