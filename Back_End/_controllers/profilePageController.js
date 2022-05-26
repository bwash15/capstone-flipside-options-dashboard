const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
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
    
    if (newUser) {
        myEmitter.emit(`profileControllerActivity`, `Profile With ${newUser.email} Already Exists!   `, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
        return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
    }

    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `No ProfileInfo found: ${user.email} `, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
        return res.status(204).json({ "message": `ProfileInfo for ${req.body.email} not found` });
    }
    myEmitter.emit(`profileControllerActivity`, `${user.email} profile found`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    if (req.body?.email) user.email = req.body.email;

    myEmitter.emit(`profileControllerActivity`, `${user.email} ${user.firstName} profile information UPDATED successfully`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    const result = await user.save()
    res.json(result);
}

module.exports = { updateProfileInfo, getProfile };