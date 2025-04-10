import jwt from 'jsonwebtoken'



//this is for authentiation protected stuff
function authMiddleware (req,res,next){
    const token = req.headers['authorization']//from frontend 
    if(!token){return res.status(401).json({message: "No token provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){return res.status(401).json({message: "Invalid token"})}
        req.userId = decoded.id
        next()//proceed to the endpt, todo routs in our case
    })
}

export default authMiddleware