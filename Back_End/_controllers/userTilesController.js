const UserTile = require('../_model/userTiles');

const handleUserTilesPost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = req.body.tileType;

    // Create and Store the new tile
    const result = await UserTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
    });
    res.json(result);
}

const handleUserTilesGet = async (req, res) => {
    const name = req.body.name;
    const uuid = req.body.uuid;
    const type = req.body.type;

    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const result = await UserTile.find();
    res.json(result);
}

const handleUserTilesDelete = async (req, res) => {
    const uuid = req.body.uuid;
    //Delete a tile based on uuid passed in
    const result = await UserTile.deleteOne({"uuid": uuid});
    res.json(result);
}

module.exports = { handleUserTilesPost, handleUserTilesGet, handleUserTilesDelete };
