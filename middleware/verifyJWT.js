const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next)=> {
    const authHeader = req.headers.authorization || req.headers.Authorization; //just in caseif it come in capital 'A'
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // not a correctly formed authporization
    
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT