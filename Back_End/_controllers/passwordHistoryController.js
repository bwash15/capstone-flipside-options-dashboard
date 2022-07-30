const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pwdHist = require('../_model/passwordHistory');
const nodeCron = require("node-cron");
myEmitter.on('userRegistration', (msg, path, filename) => logServerEvents(msg, path, filename));


const createPasswordHistory = async (req, res) => {
    const { email, password } = req.body;
    const duplicate = await pwdHist.findOne({ email: email }).exec();
    if (duplicate) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Register Conflict`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.status(403).send({ 'message': 'Previous Passwords not allowed!' });
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
        myEmitter.emit(`userRegistration`, `${email} : user Password saved`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        res.status(201).send({ 'success': `password stored!` });

    } catch (err) {
        myEmitter.emit(`userRegistration`, `${email} : failed to store password`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        res.status(500).send({ 'message': err.message });
    }
}

const addPasswordHistory = async (req, res, next) => {
    const password = req.body.password;
    const email = jwt.decode(req.body.resetToken.resetToken).email;

    const user = await pwdHist.findOne({ email: email }).exec();
    console.log('=====Made it to Password History=====');
    var info = []
    for (const pwd of user.pastPasswords) {
        var matchinfo = await bcrypt.compare(password, pwd.password)
        info.push(matchinfo)
    }
    console.log(info);
    const isFound = info.includes(true);
    console.log(isFound);

    if (isFound) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Password Conflict`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.status(403).send({ 'message': 'Previous Passwords not allowed!' });
    };
    if (info.length >= 3) {
        await cleanUp(email);
    }

    try {

        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(password, 10);
        const createdDate = new Date();
        const year = createdDate.getFullYear();
        const month = createdDate.getMonth();
        const day = createdDate.getDate();
        const expiredDate = new Date(year + 1, month, day);



        const result = await pwdHist.findOneAndUpdate(
            {
                email: email
            },
            {
                $addToSet:

                {
                    pastPasswords: {
                        "password": hashedPwd,
                        "dateCreated": createdDate,
                        "expDate": expiredDate
                    }
                }
            }
        );

        user.lastUpdated = createdDate;
        await user.save();

        console.log(result);
        myEmitter.emit(`userRegistration`, `${email} : user Password saved`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        next();

    } catch (err) {
        myEmitter.emit(`userRegistration`, `${email} : failed to store password`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.status(500).send({ 'message': err.message });
    }
}

const checkLastUpdated = async (req, res, next) => {
    const TIME_CHECK = 15 * 60 * 1000;
    const currentTime = Date.now();
    const email = jwt.decode(req.body.resetToken.resetToken).email;

    const user = await pwdHist.findOne({ email: email }).exec();
    console.log('=====Made it to Check Updated=====');
    const timeUpdated = user.lastUpdated;
    if ((currentTime - timeUpdated) < TIME_CHECK) {
        return res.status(403).send({ message: "Not able to update password at this time Please Try again later!" })
    }
    else {
        next();
    }
}

const checkHistoryCount = async (req, res, next) => {

    const password = req.body.password;
    const email = jwt.decode(req.body.resetToken.resetToken).email;

    const user = await pwdHist.findOne({ email: email }).exec();
    console.log('=====Made it to Password History=====');
    var info = []
    for (const pwd of user.pastPasswords) {
        var matchinfo = await bcrypt.compare(password, pwd.password)
        info.push(matchinfo)
    }
    console.log(info);
    const isFound = info.includes(true);
    console.log(isFound);

    if (isFound) {
        myEmitter.emit(`userRegistration`, `${email} : Duplicate found, Password Conflict`, 'UserRegistrationLogs', 'registerController/handleNewUser');
        return res.status(403).send({ 'message': 'Previous Passwords not allowed!' });
    };
    if (info.length >= 3) {
        console.log(req.body);
        var info = []
        for (const date of user.pastPasswords) {
            info.push(date.dateCreated)
        }
        console.log(info);
        var order = info.sort(function (a, b) {
            return Date.parse(a) > Date.parse(b);
        })
        console.log(order);
        console.log(order[0]);
        try {
            const result = await pwdHist.updateOne(
                {
                    email: email
                },
                {
                    $pull: {
                        pastPasswords: {
                            dateCreated: order[0]
                        }
                    }
                }
            );
            next();
        }
        catch (err) {
            return res.status(409).send({ 'message': 'Error Resetting Password Please Contact Support!' });
        }
    }
    else {
        next();
    }
}

const job = nodeCron.schedule("0 5  10 * *", function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    console.log("=====SCHEDULE MAINTENANCE=====");
});




module.exports = { createPasswordHistory, addPasswordHistory, checkHistoryCount, checkLastUpdated };
