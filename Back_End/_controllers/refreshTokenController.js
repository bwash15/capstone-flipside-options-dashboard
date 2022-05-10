const User = require('../_model/User');
const jwt = require('jsonwebtoken');
/**
 * Every time handleRefreshToken is called user gets a new accessToken for server access
 */

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    // checks IF there are cookies > if there are then checks to see if there are JWTs present
    // IF NOT returns a 401 status - Unauthorized
    if (!cookies?.jwt) return res.sendStatus(401); // checking for JWT token hidden in a cookie 

    // Defining the Refresh Token 
    const refreshToken = cookies.jwt;
    // Because we use the same name for the variable above this line > we only need the refreshToken
    // call not the (refreshToken: refreshToken)
    // if a user has defined a JWT refreshToken it will be defined in account
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if no refreshtoken if found, user gets forbidden message
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Evaluate JWT    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            // Checking User's Authorization with User Roles
            const roles = Object.values(foundUser.roles);
            // Create the JWTs - Access and Refresh 
            const accessToken = jwt.sign({
                // Object to check for User Authentication and Authorization 
                "UserInfo": {
                    "email": decoded.email,
                    "roles": roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({
                accessToken
            })
        }
    )


}
module.exports = {
    handleRefreshToken
};