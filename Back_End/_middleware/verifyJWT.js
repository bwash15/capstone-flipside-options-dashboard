const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('jwtVerification', (msg, path, filename) => logServerEvents(msg, path, filename));

const verifyJWT = (req, res, next) => {
    myEmitter.emit(`apiActivity`, ` Verifying JWT`, 'serverMiddlewareLogs', 'JWT_TokenVerificationLog.txt');
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        myEmitter.emit(`apiActivity`, ` No Bearer Header, No JWT Token Found`, 'serverMiddlewareLogs', 'JWT_TokenVerificationLog.txt');
        return res.sendStatus(401)
    };
    const token = authHeader.split(' ')[1];
    myEmitter.emit(`apiActivity`, `Bearer Header Found, Token taken from header in browser for verification`, 'serverMiddlewareLogs', 'JWT_TokenVerificationLog.txt');
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                myEmitter.emit(`apiActivity`, ` Error verifying token, ${err}`, 'serverMiddlewareLogs', 'JWT_TokenVerificationLog.txt');
                // invalid token
                console.log(`${date.getHours()}:${date.getMinutes()}
                                               :${date.getSeconds()}`);
                console.log(`Token Not Verified, Error:\n ${err}`);
                return res.sendStatus(403)
            } else {
                // valid token
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;
                console.log(`${date.getHours()}:${date.getMinutes()}
                                               :${date.getSeconds()}`);
                console.log("Token verifified successfully");
                myEmitter.emit(`apiActivity`, ` Token Verified `, 'serverMiddlewareLogs', 'JWT_TokenVerificationLog.txt');
                next();
            }
        }
    );

}

module.exports = verifyJWT;


