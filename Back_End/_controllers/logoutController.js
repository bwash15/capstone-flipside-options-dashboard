const User = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userLogoutActivity', (msg, path, filename) => logServerEvents(msg, path, filename));



/**
 * Every time handleLogout is called user gets a new accessToken for server access
 */

const handleLogout = async (req, res) => {
    myEmitter.emit(`userLogoutActivity`, ` Attempting to logout user`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
    // On Client, also delete the accessToken in the memory of the client application - zero it out
    // MUST BE HANDLED IN FRONT END - zero out the accessToken when the user clicks the logout button 
    // The back-end will clear out the refresh token
    const cookies = req.cookies;
    // checks IF there are cookies > if there are then checks to see if there are JWTs present
    // IF NOT returns a 204 status - No content
    myEmitter.emit(`userLogoutActivity`, `Checking for cookies...`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
    if (!cookies?.jwt) return res.sendStatus(204);    // checking for JWT token hidden in a cookie
    myEmitter.emit(`userLogoutActivity`, `Cookie was Found`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
    // showing in the console what is stored for the JWT
    const refreshToken = cookies.jwt;
    // if a user has defined a JWT refreshToken it will be defined in account
    myEmitter.emit(`userLogoutActivity`, `searching for user defined refreshToken`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if no refreshtoken if found, user gets forbidden message
    if (!foundUser) {
        myEmitter.emit(`userLogoutActivity`, `User defined refreshToken not found, clearing anything that could be listed as JWT`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60 * 1000 })
        return res.sendStatus(204); // 204 - Successful but no content
    };
    myEmitter.emit(`userLogoutActivity`, `User defined refreshToken found, clearing RefreshToken`, 'LogoutAttemptLogs', 'logoutController/handleLogout');

    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    const result = await foundUser.save();
    console.log(result);
    console.log("logout func")
    myEmitter.emit(`userLogoutActivity`, `RefreshToken Successfully Cleared, User Successfully Logged out`, 'LogoutAttemptLogs', 'logoutController/handleLogout');
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60 * 1000 });   // Needs the [secure: true] parameter to work in Chrome

    res.sendStatus(204);
}
module.exports = { handleLogout };
