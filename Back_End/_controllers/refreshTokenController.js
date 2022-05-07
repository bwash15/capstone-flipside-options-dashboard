const usersDB = {
    users: require('../_model/users.json'),
    setUsers: function (data) {this.users = data}
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Every time handleRefreshToken is called user gets a new accessToken for server access
 */

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    // checks IF there are cookies > if there are then checks to see if there are JWTs present
    // IF NOT returns a 401 status - Unauthorized
    if (!cookies?.jwt) return res.sendStatus(401);    // checking for JWT token hidden in a cookie 

    // Defining the Refresh Token 
    const refreshToken = cookies.jwt;
    // if a user has defined a JWT refreshToken it will be defined in account
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    // if no refreshtoken if found, user gets forbidden message
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Evaluate JWT    
   jwt.verify(
       refreshToken,
       process.env.REFRESH_TOKEN_SECRET,
       (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({ accessToken })
       }
   )

       
}
module.exports = { handleRefreshToken };
