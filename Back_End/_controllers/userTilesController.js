const UserTile = require('../_model/userTiles');

const handleUserTilesPost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = req.body.tileType;
    
    console.log("Trying to push to database")
    // Create and Store the new tile
    const result = await UserTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
    });

    res.json(result);
    console.log(result);

}

const handleUserTilesGet = async (req, res) => {
    const name = req.body.name;
    const uuid = req.body.uuid;
    const type = req.body.type;

    // Create and Store the new Tile
    
    const result = await UserTile.find();
    res.json(result);
    console.log(result);
}

const handleUserTilesDelete = async (req, res) => {
    const uuid = req.body.uuid;
    
    console.log("Trying to delete tile")
    // Create and Store the new tile
    const result = await UserTile.create();

    res.json(result);
    console.log(result);

}

module.exports = { handleUserTilesPost, handleUserTilesGet };
