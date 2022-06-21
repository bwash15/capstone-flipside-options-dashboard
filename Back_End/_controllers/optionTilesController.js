const OptionTile = require('../_model/optionTiles');

const handleUserTilesPost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = "Options";
    const userID = req.body.userID;
    console.log("user id is " + userID);
    // Create and Store the new tile
    const result = await OptionTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
        "userID": userID,
        "tiles": []
    });
    res.json(result);
}
const handleUserTilesGet = async (req, res) => {
    const userID = req.body.userID;
    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const result = await OptionTile.find({
        "userID": userID
    });
    res.json(result);
}

const handleUserTilesDelete = async (req, res) => {
    const uuid = req.body.uuid;
    //Delete a tile based on uuid passed in
    const result = await OptionTile.deleteOne({"uuid": uuid});
    res.json(result);
}

module.exports = { handleUserTilesPost, handleUserTilesGet, handleUserTilesDelete };
