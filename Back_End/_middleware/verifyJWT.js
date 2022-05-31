/** Decodes the JWT token to check to see if the user is still authorized **/


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
    
    
    //seperating the auth Header basead on delete or post/get. 
    //Delete needs to capture the data in the req.data.
    
    let authHeader;
    try{
      authHeader = JSON.stringify(req.headers.authorization).replaceAll('"',"");
    } catch(e){
        authHeader = JSON.stringify(req.data);
        console.log(authHeader)
    }

    if (!authHeader?.startsWith('Bearer ')) {
        myEmitter.emit(`jwtVerification`, ` No Bearer Header, No JWT Token Found`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
        return res.sendStatus(705)
    };
    const token = authHeader.split(' ')[1];
    myEmitter.emit(`jwtVerification`, `Bearer Header Found, Token taken from header in browser for verification`, 'JWTTokenLogs', 'JWT_TokenVerificationLog.txt');
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // invalid token
                console.log(tokenStamp);
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


