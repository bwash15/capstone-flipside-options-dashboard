/** Decodes the JWT token to check to see if the user is still authorized **/


const jwt = require('jsonwebtoken');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('jwtVerification', (msg, path, filename) => logServerEvents(msg, path, filename));

const verifyJWT = (req, res, next) => {
    myEmitter.emit(`jwtVerification`, ` Verifying JWT for access to the page`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
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
                myEmitter.emit(`jwtVerification`, ` Error verifying token `, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
                return res.sendStatus(403)
            } else {

                // valid token                
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;

                myEmitter.emit(`jwtVerification`, ` Token Verified `, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');

                next();
            }
        }
    );

}

module.exports = verifyJWT;


