/**
 *   Logic removed from the Route into the controller 
 *   > const data = {} moved from the route
 *   
 *   > move the logic created for the api routes and 
 *      place it here in the controllers place
 * 
 */

 const {logServerEvents} = require('../_middleware/logServerEvents');
 const errorHandler = require('../_middleware/errorHandler');
 const EventEmitter = require('events');
 class Emitter extends EventEmitter{};
 const myEmitter = new Emitter();
 myEmitter.on('userdataActivity', (msg, path, filename) => logServerEvents(msg, path, filename));
 myEmitter.on('serverActivityLogs', (msg, path, filename) => logServerEvents(msg, path, filename));

const data = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}


const getAllUsers = (req, res) => {
    myEmitter.emit(`serverActivityLogs`, `${req.body.email}: successfully searched for all users`, 'serverActivityLogs','userProfileCreationLogs.txt');
    res.json(data.users);
}

const createNewUser = (req,res) => {
    const newUser = {
        userid: data.users[data.users.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    if(!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password) {
        myEmitter.emit(`serverActivityLogs`, `${newUser.email}: All Fields Are Required, Profile Creation failed`, 'serverActivityLogs','userProfileCreationLogs.txt');
        return res.status(400).json({ 'message': ' All Fields Are Required'});
    }

    data.setUsers([...data.users, newUser]);
    myEmitter.emit(`serverActivityLogs`, `${newUser.email} profile created successfully`, 'serverActivityLogs','userProfileCreationLogs.txt');
    res.status(201).json(data.users);
}

const updateUser = (req,res) => {
    // Checks the userID
    const user = data.users.find(usr => usr.email === parseInt(req.body.email));
    if(!user) {
        myEmitter.emit(`serverActivityLogs`, `${user.email} not found`, 'serverActivityLogs','userSearchLogs.txt');
        return res.status(400).json({ "message": `User account ${user.email} not found`});
    }
    myEmitter.emit(`serverActivityLogs`, `${user.email} profile found`, 'serverActivityLogs','userSearchLogs.txt');
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.email) user.email = req.body.email;     
    if (req.body.password) {
        myEmitter.emit(`userdataActivity`, `${user.email} attempted to update password: Failed. Must be set at password reset site`, 'serverActivityLogs','failedPwdchangeAttempt.txt');
        return res.status(400).json({ "message": `User password must be updated through password reset`});
    }
    // filters the array and removes the existing user record from the array
    const filteredArray = data.users.filter(usr => usr.userid !== parseInt(req.body.userid));
    const unsortedArray = [...filteredArray, user];
    // we need the array in chronologically ordered
    // if the userID of a is greater than b, but we need a zero if they are EVEN as well so we add
    // the chained ternary statement
    data.setUsers(unsortedArray.sort((a, b) => a.userid > b.userid ? 1 : a.userid < b.userid ? -1 : 0));
    myEmitter.emit(`userdataActivity`, `${user.email} profile information UPDATED successfully`, 'serverActivityLogs','userProfileChangeAttempt.txt');
    res.json(data.users);
}

const deleteUser = (req,res) => {
    // Checks the userID
    const user = data.users.find(usr => usr.email === parseInt(req.body.email));
    if(!user) {
        myEmitter.emit(`serverActivityLogs`, `${user.email} not found`, 'serverActivityLogs','userSearchLogs.txt');
        return res.status(400).json({ "message": `User ID ${user.email} Not Found`});
    }
    myEmitter.emit(`userdataActivity`, `${user.email} profile found for DELETE`, 'serverActivityLogs','userSearchLogs.txt');
    // filters the array and removes the existing user record from the array
    const filteredArray = data.users.filter(usr => usr.email !== parseInt(req.body.email));
    data.setUsers([...filteredArray]);
    myEmitter.emit(`userdataActivity`, `${user.email} profile DELETED successfully`, 'serverActivityLogs','userProfileChangeAttempt.txt');
    res.json(data.users);
}

const getUser = (req, res) => {
    // Checks the userID
    // using params here because it is going to pull it directly from the URL
    const user = data.users.find(usr => usr.email === parseInt(req.params.email));
    if(!user) {
        myEmitter.emit(`serverActivityLogs`, `${user.email} not found`, 'serverActivityLogs','userSearchLogs.txt');
        return res.status(400).json({ "message": `User ID ${user.email} Not Found`});
    }
    myEmitter.emit(`userdataActivity`, `${user.email} profile found`, 'serverActivityLogs','userSearchLogs.txt');
    res.json(user);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
