/**
 *   Logic removed from the Route into the controller 
 *   > const data = {} moved from the route
 *   
 *   > move the logic created for the api routes and 
 *      place it here in the controllers place
 * 
 */

const data = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}


const getAllUsers = (req, res) => {
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
        return res.status(400).json({ 'message': ' All Fields Are Required'});
    }

    data.setUsers([...data.users, newUser]);
    res.status(201).json(data.users);
}

const updateUser = (req,res) => {
    // Checks the userID
    const user = data.users.find(usr => usr.userid === parseInt(req.body.userid));
    if(!user) {
        return res.status(400).json({ "message": `User ID ${req.body.userid} Not Found`});
    }
    // If there are any entries from the user update the properties of the user to the entry
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.email) user.email = req.body.email;     
    if (req.body.password) {
        return res.status(400).json({ "message": `User password must be updated through password reset`});
    }
    // filters the array and removes the existing user record from the array
    const filteredArray = data.users.filter(usr => usr.userid !== parseInt(req.body.userid));
    const unsortedArray = [...filteredArray, user];
    // we need the array in chronologically ordered
    // if the userID of a is greater than b, but we need a zero if they are EVEN as well so we add
    // the chained ternary statement
    data.setUsers(unsortedArray.sort((a, b) => a.userid > b.userid ? 1 : a.userid < b.userid ? -1 : 0));
    res.json(data.users);
}

const deleteUser = (req,res) => {
    // Checks the userID
    const user = data.users.find(usr => usr.userid === parseInt(req.body.userid));
    if(!user) {
        return res.status(400).json({ "message": `User ID ${req.body.userid} Not Found`});
    }
    // filters the array and removes the existing user record from the array
    const filteredArray = data.users.filter(usr => usr.userid !== parseInt(req.body.userid));
    data.setUsers([...filteredArray]);
    res.json(data.users);
}

const getUser = (req, res) => {
    // Checks the userID
    // using params here because it is going to pull it directly from the URL
    const user = data.users.find(usr => usr.userid === parseInt(req.params.userid));
    if(!user) {
        return res.status(400).json({ "message": `User ID ${req.params.userid} Not Found`});
    }
    res.json(user);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
