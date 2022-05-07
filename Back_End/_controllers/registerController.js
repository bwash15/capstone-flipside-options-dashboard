const {logServerEvents} = require('../_middleware/logServerEvents');
const errorHandler = require('../_middleware/errorHandler');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
myEmitter.on('userRegistration', (msg, path, filename) => logServerEvents(msg, path, filename));

const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, password, roles} = req.body;
    if (!firstname || !lastname || !email || !password || !roles) {
        myEmitter.emit(`userRegistration`, `${req.email} : information incomplete`, 'serverActivityLogs','userSearchLogs.txt');
        return res.status(400).json({'message': 'Email and Password are required.'});
    }// checking for duplicate usernames in the DB
    myEmitter.emit(`userRegistration`, `${req.email} not found`, 'serverActivityLogs','userSearchLogs.txt');
    const duplicate = usersDB.users.find(person => person.email === email);
    if(duplicate) {
        myEmitter.emit(`userRegistration`, `${req.email} : Duplicate found, Register Conflict`, 'serverActivityLogs','userSearchLogs.txt');
        return res.sendStatus(409)
    }; // 409 stands for Conflict
    
    try{
        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(password, 10);
        
        const newUser = {       
            "firstname" : firstname,
            "lastname" : lastname, 
            "email" : email, 
            "password" : hashedPwd,
            "roles" : roles
        };
        
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '_model', 'users.json'),
            JSON.stringify(usersDB.users)            
        );
        console.log(usersDB.users);
        myEmitter.emit(`userRegistration`, `${req.email} : user registered successfully`, 'serverActivityLogs','userSearchLogs.txt');
        res.status(201).json({'success' : `New user account created for ${email}!`})

        // // Create and Store the new user
        // const result = await User.create( {
        //     "firstname" : firstname,            
        //     "lastname" : lastname,            
        //     "email" : email,
        //     "password" : hashedPwd 
        // });
        // console.log(result);
        // res.status(201).json({'success' : `New User ${email} created`});   
    }catch(err){
        errorHandler();
        res.status(500).json({ 'message' : err.message });
    }    
}

module.exports = { handleNewUser };
