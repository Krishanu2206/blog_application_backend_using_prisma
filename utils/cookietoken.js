const getJWTtoken = require('../helpers/getJWTtoken');

const cookietoken = async(user, res)=>{
    const jwttoken = getJWTtoken(user.id);
    const options = {
        expires : new Date(
            Date.now() + (1000 * 60 * 60 * 24 * 3) 
        ),
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 3
    }
    user.password = undefined;
    res.status(200).cookie('token', jwttoken, options).send({
        success : true,
        token : jwttoken,
        user : user
    });
};

module.exports = cookietoken;



