const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('jwtVerification', (msg, path, filename) => logServerEvents(msg, path, filename));

const verifyJWT = (req, res, next) => {
    myEmitter.emit(`jwtVerification`, ` Verifying JWT for access to the page`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
    const date = new Date();
    const tokenStamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        myEmitter.emit(`jwtVerification`, ` No Bearer Header, No JWT Token Found`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
        return res.sendStatus(401)
    };
    const token = authHeader.split(' ')[1];
    myEmitter.emit(`jwtVerification`, `Bearer Header Found, Token taken from header in browser for verification`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {

                // invalid token
                console.log(`${date.getHours()}:${date.getMinutes()}
                                               :${date.getSeconds()}`);
                console.log(`Token Not Verified ${tokenStamp}, Error:\n ${err}`);
                myEmitter.emit(`jwtVerification`, ` Error verifying token ${tokenStamp}, ${err}`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
                return res.sendStatus(403)
            } else {

                // valid token                
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;
                console.log(tokenStamp);
                console.log("Token verifified successfully " + " : " + tokenStamp);
                myEmitter.emit(`jwtVerification`, ` Token Verified : for ${req.user} at ${tokenStamp} `, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
                next();
            }
        }
    );

}

module.exports = verifyJWT;


