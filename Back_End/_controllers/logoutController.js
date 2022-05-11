const User = require('../_model/User');


/**
 * Every time handleLogout is called user gets a new accessToken for server access
 */

const handleLogout = async (req, res) => {
    // On Client, also delete the accessToken in the memory of the client application - zero it out
    // MUST BE HANDLED IN FRONT END - zero out the accessToken when the user clicks the logout button 
    // The back-end will clear out the refresh token
    const cookies = req.cookies;
    // checks IF there are cookies > if there are then checks to see if there are JWTs present
    // IF NOT returns a 204 status - No content
    if (!cookies?.jwt) return res.sendStatus(204);    // checking for JWT token hidden in a cookie
    // showing in the console what is stored for the JWT
    const refreshToken = cookies.jwt;
    // if a user has defined a JWT refreshToken it will be defined in account
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if no refreshtoken if found, user gets forbidden message
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })
        return res.sendStatus(204); // 204 - Successful but no content
    };

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });   // Needs the [secure: true] parameter to work in Chrome
    res.sendStatus(204);

}
module.exports = { handleLogout };
