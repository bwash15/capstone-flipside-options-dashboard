const OptionTile = require('../_model/optionTiles');

const handleUserTilesPost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = "Options";

    // Create and Store the new tile
    const result = await OptionTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
        "tiles": []
    });
    res.json(result);
}
const handleUserTilesGet = async (req, res) => {
    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const result = await OptionTile.find();
    res.json(result);
}

const handleUserTilesDelete = async (req, res) => {
    const uuid = req.body.uuid;
    //Delete a tile based on uuid passed in
    const result = await OptionTile.deleteOne({"uuid": uuid});
    res.json(result);
}

module.exports = { handleUserTilesPost, handleUserTilesGet, handleUserTilesDelete };
