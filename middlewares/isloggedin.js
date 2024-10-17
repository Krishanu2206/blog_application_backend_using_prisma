const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const isloggedin = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.send('Please login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userid
            }
        });
        if(!req.user){
            return res.status(404).send('Invalid token! No user found!');
        }
        next();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = isloggedin;