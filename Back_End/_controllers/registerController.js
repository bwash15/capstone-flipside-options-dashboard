const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, password, roles} = req.body;
    if (!firstname || !lastname || !email || !password || !roles) return res.status(400).json({'message': 'Email and Password are required.'});
    // checking for duplicate usernames in the DB
    const duplicate = usersDB.users.find(person => person.email === email);
    if(duplicate) return res.sendStatus(409); // 409 stands for Conflict

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
        res.status(500).json({ 'message' : err.message });
    }    
}

module.exports = { handleNewUser };
