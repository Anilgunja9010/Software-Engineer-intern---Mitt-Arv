

const User = require ('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretkey = process.env.SECRET_KEY || "mysecretkey"

//REGISTER
const userRegister = async(req, res)=>{
    const {username, email, password} = req.body

    try{
        const userEmail = await User.findOne({email});
        if(userEmail){
            return res.status(400).json("Email already taken")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email : email.toLowerCase(),
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({message: "User registered Successfully"});
        console.log('registered')
 
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Internal server error"})

    }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY || "mysecretkey",
      { expiresIn: "1h" }
    );

    // Send back token + user
    res.status(200).json({
      success: "Login Successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name || ""
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {userRegister, userLogin};