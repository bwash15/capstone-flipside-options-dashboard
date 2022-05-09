const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) { this.users = data }
}


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');

const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userLoginActivity', (msg, path, filename) => logServerEvents(msg, path, filename));
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    myEmitter.emit(`userLoginActivity`, `${email} Attempting to sign-in`, 'serverActivityLogs', 'loginAttemptLog.txt');
    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required.' });    // checking for duplicate usernames in the DB

    myEmitter.emit(`userLoginActivity`, `Attempting to locate ${email} `, 'serverActivityLogs', 'loginAttemptLog.txt');
    const foundUser = usersDB.users.find(person => person.email === email);
    if (!foundUser) {
        myEmitter.emit(`userLoginActivity`, `${email} is Unauthorized `, 'serverActivityLogs', 'loginAttemptLog.txt');
        return res.sendStatus(401) //Unauthoized
    };
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        myEmitter.emit(`userLoginActivity`, `${email} logged in successfully`, 'serverActivityLogs', 'loginAttemptLog.txt');
        // Checking User's Authorization with User Roles
        const roles = Object.values(foundUser.roles);

        // Create the JWTs - Access and Refresh 
        myEmitter.emit(`userLoginActivity`, `Creating JWT...`, 'serverActivityLogs', 'loginAttemptLog.txt');
        const accessToken = jwt.sign(
            {
                // Object to check for User Authentication and Authorization 
                // Considered to be a 'PRIVATE JWT Claim'
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        // No need to set roles in the refresh token, 
        // Refresh Token is only there to verify you can get a NEW ACCESS TOKEN
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            // Set this so there is not an INDEFINITE refresh token capability
            { expiresIn: '3m' }
        );

        // Save the Refresh token to the database with the current user
        const otherUsers = usersDB.users.filter(person => person.email !== foundUser.email);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '_model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        //***  comment out the code above to enter the code below */  
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        // console.log(result);
        // DONT NOT STORE THIS IN LOCAL STORAGE
        // KEEP IN MEMORY OR APP STORAGE
        // ** httpOnly cookie not available in javascript **
        //                                   left out parm: [secure: true]
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        //************************************************************************ */
        // Send the JWT to the front end for the front end 
        res.json({ accessToken });
        //************************************************************************ */
    } else {
        myEmitter.emit(`userLoginActivity`, `${foundUser.email} logged in failed`, 'serverActivityLogs', 'loginAttemptLog.txt');

        res.sendStatus(401);
    }
}
module.exports = { handleLogin };











