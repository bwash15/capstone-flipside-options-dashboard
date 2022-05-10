const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        // Mapping over the roles in the JWT
        // searches the roles array IF it finds a match it will return the first match it finds
        // find stops after the first true > this works since we only need to find one role
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // IF we did not find a true result => Unauthorized
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles