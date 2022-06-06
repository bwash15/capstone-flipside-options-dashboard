const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


module.exports = {updatePassword };
