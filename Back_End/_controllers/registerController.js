const User = require('../_model/User');
const pwdHist = require('../_model/passwordHistory');
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
            myEmitter.emit(`userRegistration`, ` Firstname not found `, 'UserRegistrationLogs', 'registerController/handleNewUser');
        };
        if (!lastname) {
            console.log('Lastname is Required')
            myEmitter.emit(`userRegistration`, `Lastname not found `, 'UserRegistrationLogs', 'registerController/handleNewUser');
        };
        if (!email) {
            console.log('Email is Required')
            myEmitter.emit(`userRegistration`, ` Email not found `, 'UserRegistrationLogs', 'registerController/handleNewUser');
        };
        if (!password) {
            console.log('Password is Required')
            myEmitter.emit(`userRegistration`, ` Password not found `, 'UserRegistrationLogs', 'registerController/handleNewUser');

        };
        //------------------------------------------------------------------
        myEmitter.emit(`userRegistration`, `${email} : information incomplete`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.status(400).json({ 'message': 'All Fields are required.' });
    }
    myEmitter.emit(`userRegistration`, `${email} : Attempting to Register`, 'UserRegistrationLogs', 'registerController/handleNewUser');
    // Returns any User in the database that matches the email submitted

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Register Conflict`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.sendStatus(409) // 409 stands for Conflict
    };

    try {
        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(password, 10);
        myEmitter.emit(`userRegistration`, `${email} : Account Verified, Creating NewUser Profile`, 'UserRegistrationLogs', 'registerController/handleNewUser');

        // Create and Store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": hashedPwd,
            "phonenumber": "N/A"
        });

        // Create and Store Password for Reset History
        const pwdH = await createPasswordHistory(req);
        console.log(pwdH);

        console.log(result);

        myEmitter.emit(`userRegistration`, `${email} : user registered successfully`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        res.status(201).json({ 'success': `New user account created!` });

    } catch (err) {
        myEmitter.emit(`userRegistration`, `${email} : user registration Failed`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        res.status(500).json({ 'message': err.message });
    }
}

const createPasswordHistory = async (req) => {
    const {email, password } = req.body;
    const duplicate = await pwdHist.findOne({ email: email }).exec();
    if (duplicate) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Register Conflict`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return "dupe" // 409 stands for Conflict
    };
    try {
        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(password, 10);
        const createdDate = new Date();
        const year = createdDate.getFullYear();
        const month = createdDate.getMonth();
        const day = createdDate.getDate();
        const expiredDate = new Date(year + 1, month, day);
        console.log(createdDate);
        console.log(expiredDate);

        // Create and Store the new tile
        const result = await pwdHist.create({
            "email": email,
            "lastUpdated": createdDate,
            "pastPasswords": [{
                "password": hashedPwd,
                "dateCreated": createdDate,
                "expDate": expiredDate
            }]
        });

        console.log(result);
        return { 'success': `New user password history created!` };

    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { handleNewUser };
