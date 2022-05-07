const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {logServerEvents} = require('../_middleware/logServerEvents');
const errorHandler = require('../_middleware/errorHandler');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
myEmitter.on('userLoginActivity', (msg, path, filename) => logServerEvents(msg, path, filename));
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) => {
    const { email, password} = req.body;
    myEmitter.emit(`userLoginActivity`, `${email} Attempting to sign-in`, 'serverActivityLogs','loginAttemptLog.txt');
    if (!email || !password ) return res.status(400).json({'message': 'Email and Password are required.'});    // checking for duplicate usernames in the DB
    const foundUser = usersDB.users.find(person => person.email === email);
    if (!foundUser) return res.sendStatus(401); //Unauthoized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        myEmitter.emit(`userLoginActivity`, `${email} logged in successfully`, 'serverActivityLogs','loginAttemptLog.txt');
        // Create the JWTs - Access and Refresh 
        const accessToken = jwt.sign(
            {"email" : foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}
        );

        const refreshToken = jwt.sign(
            {"email" : foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            // Set this so there is not an INDEFINITE refresh token capability
            { expiresIn: '3m'}
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
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
//************************************************************************ */
        // Send the JWT to the front end for the front end 
        res.json({ accessToken });
//************************************************************************ */
    } else {
        myEmitter.emit(`userLoginActivity`, `${email} logged in failed`, 'serverActivityLogs','loginAttemptLog.txt');
        errorHandler();
        res.sendStatus(401);
    }
}
module.exports = { handleLogin };











