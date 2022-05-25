/**
 *   Logic removed from the Route into the controller 
 *   > const data = {} moved from the route
 *   
 *   > move the logic created for the api routes and 
 *      place it here in the controllers place
 * 
 */
const User = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('userControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        myEmitter.emit(`userControllerActivity`, `User search returned no results: ${users}`, 'serverActivityLogs', 'getUser/userController');
        return res.status(204).json({ 'message': 'No users found ' })
    };
    myEmitter.emit(`userControllerActivity`, `User search successful: ${JSON.stringify(users)}`, 'serverActivityLogs', 'getUser/userController');
    res.json(users);
}

const createNewUser = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.email || !req?.body?.password) {
        myEmitter.emit(`userControllerActivity`, `All Fields Are Required, Profile Creation failed`, 'serverActivityLogs', 'createUser/userController');
        return res.status(400).json({ 'message': ' All Fields Are Required' });
    }
    try {
        const result = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (req, res) => {
    // Checks the userID
    if (!req?.body?.email) {
        return res.status(400).json({ 'message': 'ID parameter required, No ID found' });
    }
    // We have confirmed we have found the User if we have made it here
    // Defining what User to update
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
        myEmitter.emit(`userControllerActivity`, `No User account found: ${user.email} `, 'userContollerLogs', 'updateUser/userController');
        return res.status(204).json({ "message": `User account ${req.body.email} not found` });
    }
    myEmitter.emit(`userControllerActivity`, `${user.email} profile found`, 'userContollerLogs', 'updateUser/userController');
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.password) {
        myEmitter.emit(`userControllerActivity`, `${user.email} attempted to update password: Failed. Must be set at password reset site`, 'userContollerLogs', 'updateUser/userController');
        return res.status(400).json({ "message": `User password must be updated through password reset` });
    }
    myEmitter.emit(`userControllerActivity`, `${user.email} profile information UPDATED successfully`, 'userContollerLogs', 'update/userController');
    const result = await user.save()
    res.json(result);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.email) return res.status(400).json({ 'message': `User Email Required ` })
    // Checks the userID
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        myEmitter.emit(`userControllerActivity`, `${user.email} not found`, 'userContollerLogs', 'getUser/userController');
        return res.status(400).json({ "message": `User ID ${user.email} Not Found` });
    }
    myEmitter.emit(`userControllerActivity`, `${user.email} profile found for DELETE`, 'userContollerLogs', 'getUser/userController');
    const result = await user.deleteOne({ email: req.body.email })
    myEmitter.emit(`userControllerActivity`, `${user.email} profile DELETED successfully`, 'userContollerLogs', 'getUser/userController');
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ 'message': `User Email Required ` })
    // Checks the userID
    // using params here because it is going to pull it directly from the URL
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
        myEmitter.emit(`userControllerActivity`, `${req.params.email} not found`, 'userContollerLogs', 'getUser/userController');
        return res.status(400).json({ "message": `User Email ${req.params.email} Not Found` });
    }
    myEmitter.emit(`userControllerActivity`, `${req.params.email} profile found`, 'userContollerLogs', 'getUser/userController');
    res.json(user);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
