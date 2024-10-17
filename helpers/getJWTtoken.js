const jwt = require('jsonwebtoken');

const getJWTtoken = (userid) => {
    const token = jwt.sign({userid : userid}, process.env.JWT_SECRET, {expiresIn : '1d'});
    return token;
}

module.exports = getJWTtoken;