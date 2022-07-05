const NewsTile = require('../_model/newsTiles');

const handleNewsTilePost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = "News";
    const userID = req.body.userID;
    // Create and Store the new tile
    const result = await NewsTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
        "userID": userID,
        "tiles": []
    });
    res.json(result);
}
const handleNewsTileGet = async (req, res) => {
    const userID = req.body.userID;
    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const result = await NewsTile.find({'userID': userID});
    res.json(result);
}

const handleNewsTileDelete = async (req, res) => {
    const uuid = req.body.uuid;
    //Delete a tile based on uuid passed in
    const result = await NewsTile.deleteOne({"uuid": uuid});
    res.json(result);
}

module.exports = { handleNewsTilePost, handleNewsTileGet, handleNewsTileDelete};
