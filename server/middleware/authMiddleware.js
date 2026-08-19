import jwt from "jsonwebtoken"


const authMiddleware = async(req, res, next) =>{
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({
      msg:"Authorization token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const result = jwt.verify(token,process.env.JWT_SECRET)

        req.userId = result.userId;

    if(result){
      return next();
    }

  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
}

export default authMiddleware