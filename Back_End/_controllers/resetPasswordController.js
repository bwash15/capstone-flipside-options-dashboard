const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
myEmitter.on('profileControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));



const updatePassword = async (req,res) => {
    console.log("=====Made It To Back======");
    console.log(req.body);
    const date = new Date();
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const expire = jwt.decode(req.body.resetToken.resetToken).exp;
    const newexp = expire * 1000;
    const expdate = new Date(newexp);
    const token = req.body.resetToken.resetToken;
    const tokenStamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(expdate);

    const jwtVerified = async (email) => {
        console.log(email);
        console.log(hashedPwd);
        const user = await ProfileInfo.findOne({ email: email }).exec();

        if (!user) {
            myEmitter.emit(`profileControllerActivity`, `${email} not found`, 'profileContollerLogs', 'getProfile/ProfilePageController');
            return res.status(400).json({ "message": `User Email ${email} Not Found` });
        }
        if (hashedPwd && hashedPwd != user.password) user.password = hashedPwd;
        try{
            await user.save()
        }
        catch (err)
        {
            return res.status(400).json({ "message": `Unable To Update Password!` });
        }
        return res.status(200).json({ "message": `Password Updated!` });
    }

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // invalid token
                console.log(tokenStamp);
                console.log(`Token Not Verified ${tokenStamp}, Error:\n ${err}`);
                myEmitter.emit(`jwtVerification`, ` Error verifying token ${tokenStamp}, ${err}`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
                return res.status(403).json({ "message": `Reset Link Expired!` });
            } else {
                // valid token             
                console.log(tokenStamp);
                console.log("Token verifified successfully " + " : " + tokenStamp);
                myEmitter.emit(`jwtVerification`, ` Token Verified : for ${req.user} at ${tokenStamp} `, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
                jwtVerified(decoded.email);
            }
        }
    );

    
  }

  const checkForEmail = async (req,res) => {
    console.log("=====Made It To Check Email======");
    console.log(req.body);
    if (!req?.body?.email) {
        return res.status(400).send({ 'message': 'No Email for Request!' });
    }
    const email = req.body.email;
    const user = await ProfileInfo.findOne({ email: email }).exec();

    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `${email} not found`, 'profileContollerLogs', 'getProfile/ProfilePageController');
        return res.status(400).send({ "message": `No account found with the email: ${email}` });
    }
    try{
        const result = await sendEmail(user.email);
        console.log(result.message);
    }
    catch (err)
    {
        return res.status(400).json({ "message": `Unable To Send Email!` });
    }
    return res.status(200).json({ "message": `Email Sent!` });
  }

  const sendEmail = async (req) => {
    try{

        const email = req
        console.log(email);
        const resetToken = jwt.sign(
            { "email": email },
            process.env.REFRESH_TOKEN_SECRET,
            // Set this so there is not an INDEFINITE refresh token capability
            { expiresIn: '15m' }
        );


        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Reset Password",
            html: `<div className="email" style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
            ">
            <h2> Hope you get this!</h2>
            <p>http://localhost:3000/reset/${resetToken}</p>
            <p>https://flipside-test-729io.ondigitalocean.app/reset/${resetToken}</p>
            
            </div>`
        })
        return {"message": `Email Sent!` };
    }
    catch(error)
    {
        console.log(error);
        return error;
    }
}


module.exports = {updatePassword, checkForEmail, sendEmail };
