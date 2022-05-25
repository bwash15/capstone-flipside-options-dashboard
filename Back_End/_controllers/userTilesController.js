const UserTile = require('../_model/userTiles');

const handleUserTilesPost = async (req, res) => {
    const {name, type, uuid} = req.body;
    try {
        // Create and Store the new user
        const result = await UserTile.create({
            "name": firstname,
            "type": lastname,
            "uuid": email,
        });

        console.log(result);
    } catch (err) {
        myEmitter.emit(`userTiles`, `${name} : user tiles saving Failed`, 'usertileslogs', 'usertileslogs2');
        res.status(500).json({ 'message': err.message });
    }
}

const handleUserTilesGet = async (req, res) => {
    const {name, type, uuid} = req.body;
    try {
        // Create and Store the new user
        const result = await UserTile.create({
            "name": firstname,
            "type": lastname,
            "uuid": email,
        });

        console.log(result);
    } catch (err) {
        myEmitter.emit(`userTiles`, `${name} : user tiles saving Failed`, 'usertileslogs', 'usertileslogs2');
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleUserTilesPost, handleUserTilesGet };
