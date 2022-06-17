const User = require('../_model/User');
const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('refreshTokenActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

/**
 * Every time handleRefreshToken is called user gets a new accessToken for server access
 */

const handleRefreshToken = async (req, res) => {
    myEmitter.emit(`refreshTokenActivity`, `Attempting to Refresh Access Token`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
    const cookies = req.cookies;
    // checks IF there are cookies > if there are then checks to see if there are JWTs present
    // IF NOT returns a 401 status - Unauthorized
    if (!cookies?.jwt) return res.sendStatus(401); // checking for JWT token hidden in a cookie 
    myEmitter.emit(`refreshTokenActivity`, `JWT found in Cookie`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');

    // Defining the Refresh Token 
    const refreshToken = cookies.jwt;
    //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });  ******************************
    // Because we use the same name for the variable above this line > we only need the refreshToken
    // call not the (refreshToken: refreshToken)
    // if a user has defined a JWT refreshToken it will be defined in account
    myEmitter.emit(`refreshTokenActivity`, `Verifying User has Refresh Access Token in account`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if no refreshtoken if found, user gets forbidden message
    if (!foundUser) return res.sendStatus(403); // Forbidden
    myEmitter.emit(`refreshTokenActivity`, `RefreshToken was found`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
    const env = process.env.REFRESH_TOKEN_SECRET || process.env.REACT_APP_REFRESH_TOKEN_SECRET;
    // Evaluate JWT    
    jwt.verify(
        refreshToken,
        env,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) {
                myEmitter.emit(`refreshTokenActivity`, `Error verifying Token or User email not found`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
                return res.sendStatus(403)
            };
            // Checking User's Authorization with User Roles
            const roles = Object.values(foundUser.roles);
            myEmitter.emit(`refreshTokenActivity`, `User role was Found and Verified, Access Granted `, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
            // Create the JWTs - Access and Refresh 
            const accessToken = jwt.sign({
                // Object to check for User Authentication and Authorization 
                "UserInfo": {
                    "email": decoded.email,
                    "roles": roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            );


            res.json({ roles, accessToken })
            myEmitter.emit(`refreshTokenActivity`, `Refreshed Access Token Successfully`, 'JWTTokenLogs', 'refreshController/handleRefreshToken');
        }
    )


}
module.exports = {
    handleRefreshToken
};