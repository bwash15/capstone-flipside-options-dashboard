const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userRoleVerification', (msg, path, filename) => logServerEvents(msg, path, filename));


const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        myEmitter.emit(`userRoleVerification`, ` Verifying user trying to gain access to page has a USER_ROLE`, 'UserRolesVerifyLogs', '_middleware/verifyRoles');
        
        console.log("---Allowed Roles---");
        console.log(`---${JSON.stringify(allowedRoles)}---`);
        
        if (!req?.roles) {
            myEmitter.emit(`userRoleVerification`, ` User role not Verified, User Access Denied - Unauthorized`, 'UserRolesVerifyLogs', '_middleware/verifyRoles');
            return res.sendStatus(401)
        };
        myEmitter.emit(`userRoleVerification`, ` User has a role is verified`, 'UserRolesVerifyLogs', '_middleware/verifyRoles');
       // const rolesArray = [allowedRoles];
        // Mapping over the roles in the JWT
        // searches the roles array IF it finds a match it will return the first match it finds
        // find stops after the first true > this works since we only need to find one role
        myEmitter.emit(`userRoleVerification`, `Verifying user is authorized to access the page requested`, 'UserRolesVerifyLogs', '_middleware/verifyRoles');
        
        const userRoles = req.roles;
        const roleCheck = JSON.stringify(allowedRoles);
        
        //const result = roleCheck.map(role => rolesArray.includes(role)).find(val => val === true);
        const result = roleCheck.includes(userRoles);

        // IF we did not find a true result => Unauthorized
        if (!result) return res.sendStatus(401);
        myEmitter.emit(`userRoleVerification`, ` User Role is verified, User is authorized to access requested page`, 'UserRolesVerifyLogs', '_middleware/verifyRoles');
        next();
    }
}

module.exports = verifyRoles