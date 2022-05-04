const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password ) return res.status(400).json({'message': 'Email and Password are required.'});    // checking for duplicate usernames in the DB
    const foundUser = usersDB.users.find(person => person.email === email);
    if (!foundUser) return res.sendStatus(401); //Unauthoized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        // Create the JWTs - Access and Refresh 
        const accessToken = jwt.sign(
            {"email" : foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}
        );

        const refreshToken = jwt.sign(
            {"email" : foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            // Set this so there is not an INDEFINITE refresh token capability
            { expiresIn: '1d'}
        );

        // Save the Refresh token to the database with the current user
        const otherUsers = usersDB.users.filter(person => person.email !== foundUser.email);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        //***  comment out the code above to enter the code below */  
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        // console.log(result);
            // DONT NOT STORE THIS IN LOCAL STORAGE
            // KEEP IN MEMORY OR APP STORAGE
            // ** httpOnly cookie not available in javascript **
            //                                   left out parm: [secure: true]
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}
module.exports = { handleLogin };











