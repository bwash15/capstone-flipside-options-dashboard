const User = require('../_model/User');
const bcrypt = require('bcrypt');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userRegistration', (msg, path, filename) => logServerEvents(msg, path, filename));




const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // If we dont have each piece above in the request > Sends a 400 status 'Bad Request'
    if (!firstname || !lastname || !email || !password) {
        if (!firstname) {
            console.log('Firstname is Required')
            myEmitter.emit(`userRegistration`, ` Firstname not found `, 'serverActivityLogs', 'userRegentrylog.txt');
        };
        if (!lastname) {
            console.log('Lastname is Required')
            myEmitter.emit(`userRegistration`, `Lastname not found `, 'serverActivityLogs', 'userRegentrylog.txt');
        };
        if (!email) {
            console.log('Email is Required')
            myEmitter.emit(`userRegistration`, ` Email not found `, 'serverActivityLogs', 'userRegentrylog.txt');
        };
        if (!password) {
            console.log('Password is Required')
            myEmitter.emit(`userRegistration`, ` Password not found `, 'serverActivityLogs', 'userRegentrylog.txt');

        };
        //------------------------------------------------------------------
        myEmitter.emit(`userRegistration`, `${email} : information incomplete`, 'serverActivityLogs', 'userRegentrylog.txt');
        return res.status(400).json({ 'message': 'All Fields are required.' });
    }
    myEmitter.emit(`userRegistration`, `${email} : Attempting to Register`, 'serverActivityLogs', 'userRegistration.txt');
    // Returns any User in the database that matches the email submitted

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Register Conflict`, 'serverActivityLogs', 'userRegistration.txt');
        return res.sendStatus(409) // 409 stands for Conflict
    };

    try {
        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(password, 10);
        myEmitter.emit(`userRegistration`, `${email} : Account Verified, Creating NewUser Profile`, 'serverActivityLogs', 'userRegistration.txt');

        // Create and Store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        myEmitter.emit(`userRegistration`, `${email} : user registered successfully`, 'serverActivityLogs', 'userRegistration.txt');
        res.status(201).json({ 'success': `New user account created!` });

    } catch (err) {
        myEmitter.emit(`userRegistration`, `${email} : user registration Failed`, 'serverActivityLogs', 'userRegistration.txt');
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
