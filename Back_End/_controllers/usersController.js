/**
 *   Logic removed from the Route into the controller 
 *   > const data = {} moved from the route
 *   
 *   > move the logic created for the api routes and 
 *      place it here in the controllers place
 * 
 */

const data = {};
data.users = require('../_model/users.json')

const getAllUsers = (req, res) => {
    res.json(data.users);
}

const createNewUser = (req,res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role
    })
}

const updateUser = (req,res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role
    })
}

const deleteUser = (req,res) => {
    res.json({"userid": req.body.userid});
}


const getUser = (req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"userid": req.params.userid});
    }


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
