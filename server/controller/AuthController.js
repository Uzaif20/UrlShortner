import bcrypt from "bcryptjs";
import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Missing required field",
    });
  }

  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "Email already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "User created successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const signIn = async (req, res) =>{
  const {email, password} = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      msg: "Missing required field",
    });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if(!user){
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    const token= generateToken(user._id);
    return res.status(200).json({
      msg:"Login Successfully",
      token
    })

  } catch (error) {
     console.log(error);
     return res.status(500).json({
       msg: "Internal Server Error",
     });
  }
}

export { signUp, signIn };
