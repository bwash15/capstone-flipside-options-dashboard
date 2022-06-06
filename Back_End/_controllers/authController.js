const User = require('../_model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userLoginActivity', (msg, path, filename) => logServerEvents(msg, path, filename));



const handleLogin = async (req, res) => {

    const { email, password } = req.body;
    myEmitter.emit(`userLoginActivity`, `${email} Attempting to sign-in`, 'LoginAttemptLogs', 'authController/handleLogin');
    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required.' });    // checking for duplicate usernames in the DB

    myEmitter.emit(`userLoginActivity`, `Attempting to locate ${email} `, 'LoginAttemptLogs', 'authController/handleLogin');
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) {
        myEmitter.emit(`userLoginActivity`, `${email} is Unauthorized `, 'LoginAttemptLogs', ' authController/handleLogin');
        return res.sendStatus(401) //Unauthoized
    };
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        myEmitter.emit(`userLoginActivity`, `${email} logged in successfully`, 'LoginAttemptLogs', 'authController/handleLogin');
        // Checking User's Authorization with User Roles
        const roles = Object.values(foundUser.roles).filter(Boolean);

        // Create the JWTs - Access and Refresh 
        myEmitter.emit(`userLoginActivity`, `Creating JWT...`, 'LoginAttemptLogs', 'authController/handleLogin');
        const authenv = process.env.ACCESS_TOKEN_SECRET || process.env.REACT_APP_ACCESS_TOKEN_SECRET;
        const accessToken = jwt.sign(
            {
                // Object to check for User Authentication and Authorization 
                // Considered to be a 'PRIVATE JWT Claim'
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            authenv,
            { expiresIn: '15m' }
        );

        const env = process.env.REFRESH_TOKEN_SECRET || process.env.REACT_APP_REFRESH_TOKEN_SECRET;
        // No need to set roles in the refresh token, 
        // Refresh Token is only there to verify you can get a NEW ACCESS TOKEN
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            env,
            // Set this so there is not an INDEFINITE refresh token capability
            { expiresIn: '15m' }
        );

        // ***  comment out the code above to enter the code below */  
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        // DONT NOT STORE THIS IN LOCAL STORAGE
        // KEEP IN MEMORY OR APP STORAGE
        // ** httpOnly cookie not available in javascript **
        //                                   left out parm: [secure: true]
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 1000 });

        //************************************************************************ */
        // Send the JWT to the front end for the front end 
        res.json({ roles, accessToken });
        //************************************************************************ */       
    } else {
        myEmitter.emit(`userLoginActivity`, `${foundUser.email} logged in failed`, 'LoginAttemptLogs', 'authController/handleLogin');

        res.sendStatus(401);
    }
}
module.exports = { handleLogin };











