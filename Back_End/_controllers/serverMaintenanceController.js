const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const pwdHist = require('../_model/passwordHistory');
myEmitter.on('userRegistration', (msg, path, filename) => logServerEvents(msg, path, filename));

const deleteOldPwd = async (data) => {
    const history = await pwdHist.find().exec();
    console.log(data);
    try{
        for(const date of data)
        {
            const time = new Date(date);
            console.log(time);
            const user = await pwdHist.updateMany(
            {
                expDate: time
            },
            {
                $pull: {
                    pastPasswords: {
                        expDate: time
                    }
                }
            }
            );
            console.log(user);
        }

        console.log("=====MAINTENANCE COMPLETE=====");
        console.log(`${data.length} Files Deleted!`);
    }
    catch(err)
    {
        console.log(err);
    }

}

const findOldPwd = async () => {
    const history = await pwdHist.find().exec();
    const currentTime = Date.now();
    console.log('=====Delete Password History=====');
    var info = []
    for (const user of history) {
        for (const pwd of user.pastPasswords) {
            var matchinfo = pwd.expDate;
            if((currentTime - matchinfo) / (1000 * 3600 * 24 * 365) > 1 )
                info.push(matchinfo)
        }
    }
    if(info.length > 0)
        deleteOldPwd(info)
    else{
        console.log(`${info.length} Files Deleted!`);
        console.log("=====MAINTENANCE COMPLETE=====");
    }
    
}

module.exports = {findOldPwd, deleteOldPwd};