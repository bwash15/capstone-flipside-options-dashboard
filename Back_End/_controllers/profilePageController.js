const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const crypto = require('crypto');
const { resolve } = require('path');
const nodemailer = require('nodemailer');
const myEmitter = new Emitter();
myEmitter.on('profileControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

const getProfile = async (req, res) => {
    console.log(req.body.email);    
    if (!req?.body?.email) return res.status(400).json({ 'message': `User Email Required ` })
    // Checks the userID
    // using body here because it is going to pull it directly from the URL
    const user = await ProfileInfo.findOne({ email: req.body.email }).exec();
    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `${req.body.email} not found`, 'profileContollerLogs', 'getProfile/ProfilePageController');
        return res.status(400).json({ "message": `User Email ${req.body.email} Not Found` });
    }
    myEmitter.emit(`profileControllerActivity`, `${req.body.email} profile found`, 'profileContollerLogs', 'getProfile/ProfilePageController');
    res.json(user);
}

const createProfile = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.email) {
        myEmitter.emit(`userControllerActivity`, `All Fields Are Required, Profile Creation failed`, 'serverActivityLogs', 'createUser/userController');
        return res.status(400).json({ 'message': ' All Fields Are Required' });
    }
    try {
        const result = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}



const updateProfileInfo = async (req, res) => {
    // Checks the userID
    if (!req?.body?.oldEmail) {
        return res.status(400).json({ 'message': 'ID parameter required, No ID found' });
    }
    // We have confirmed we have found the User if we have made it here
    // Defining what User to update
    console.log(req.body.email)
    const newUser = await ProfileInfo.findOne({ email: req.body.email }).exec();

    const user = await ProfileInfo.findOne({ email: req.body.oldEmail }).exec();

    if(req.body.email != req.body.oldEmail)
    {
        if (newUser) {
            myEmitter.emit(`profileControllerActivity`, `Profile With ${newUser.email} Already Exists!   `, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
            return res
                    .status(409)
            
                    .send({ message: "User with given email already Exist!" });
        }
    }

    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `No ProfileInfo found: ${user.email} `, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
        return res.status(204).json({ "message": `ProfileInfo for ${req.body.email} not found` });
    }
    console.log(`=====${req.body.phonenumber}======`);
    myEmitter.emit(`profileControllerActivity`, `${user.email} profile found`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body?.firstname && req.body?.firstname != user.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname && req.body?.lastname != user.lastname) user.lastname = req.body.lastname;
    if (req.body?.email && req.body?.email != user.email) user.email = req.body.email;
    if (req.body?.phonenumber && req.body?.phonenumber != user.phonenumber) user.phonenumber = req.body.phonenumber;

    myEmitter.emit(`profileControllerActivity`, `${user.email} ${user.firstname} profile information UPDATED successfully`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    const result = await user.save()
    res.json(result);
}

const sendEmail = async (req,res) => {

    const email = req.body.email
    console.log(email);
    const transport = nodemailer.createTransport({
        host: process.env.REACT_APP_MAIL_HOST || process.env.MAIL_HOST,
        port: process.env.REACT_APP_MAIL_PORT || process.env.MAIL_PORT,
        auth: {
            user: process.env.REACT_APP_MAIL_USER || process.env.MAIL_USER,
            pass: process.env.REACT_APP_MAIL_PASS || process.env.MAIL_PASS,
        }
    })

    await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Hello John",
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
        ">
        <h2> Hope you get this!</h2>
        <p>${email}</p>
        
        </div>`
    })
    res.send({message: "done"});
  }


module.exports = { updateProfileInfo, getProfile, sendEmail, createProfile };
