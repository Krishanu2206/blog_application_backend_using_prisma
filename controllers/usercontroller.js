const prisma = require('../prisma/index');
const cookietoken = require('../utils/cookietoken');

//user signup
exports.signup = async(req, res, next)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            throw new Error('Please provide all fields');
        }

        const user = await prisma.user.create({
            data : {
                name,
                email,
                password,
            }
        });

        //send user a token
        cookietoken(user, res)
        
    } catch (error) {
        throw new Error(error);
    }
}

//login user
exports.login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error('Please provide email and password');
        }

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        });
        if(!user){
            throw new Error('No user found!');
        }

        if(user.password != password){
            throw new Error('Invalid username or password!')
        }

        //if user is validated
        cookietoken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}

//user logout
exports.logout = async(req, res, next)=>{
    try {
        res.clearCookie('token');
        res.status(200).send({success : true, message : 'Logged out successfully!'});
    } catch (error) {
        throw new Error(error);
    }
}
