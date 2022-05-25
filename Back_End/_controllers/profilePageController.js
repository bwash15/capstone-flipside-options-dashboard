const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('profileControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

const getProfile = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ 'message': `User Email Required ` })
    // Checks the userID
    // using params here because it is going to pull it directly from the URL
    const user = await ProfileInfo.findOne({ email: req.params.email }).exec();
    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `${req.params.email} not found`, 'profileContollerLogs', 'getUser/ProfilePageController');
        return res.status(400).json({ "message": `User Email ${req.params.email} Not Found` });
    }
    myEmitter.emit(`profileControllerActivity`, `${req.params.email} profile found`, 'profileContollerLogs', 'getUser/ProfilePageController');
    res.json(user);
}



const updateProfileInfo = async (req, res) => {
    // Checks the userID
    if (!req?.body?.email) {
        return res.status(400).json({ 'message': 'ID parameter required, No ID found' });
    }
    // We have confirmed we have found the User if we have made it here
    // Defining what User to update
    const user = await ProfileInfo.findOne({ email: req.body.email }).exec();

    if (!user) {
        myEmitter.emit(`profileControllerActivity`, `No ProfileInfo found: ${user.email} `, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
        return res.status(204).json({ "message": `ProfileInfo for ${req.body.email} not found` });
    }
    myEmitter.emit(`profileControllerActivity`, `${user.email} profile found`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    if (req.body?.email) user.email = req.body.email;

    myEmitter.emit(`profileControllerActivity`, `${user.email} profile information UPDATED successfully`, 'profileContollerLogs', 'updateProfileInfo/ProfilePageController');
    const result = await user.save()
    res.json(result);
}

module.exports = { updateProfileInfo, getProfile };