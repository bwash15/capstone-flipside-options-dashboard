const NewsTile = require('../../_model/Tiles/News');

const handleNewsTilePost = async (req, res) => {
    const name = req.body.tileName;
    const uuid = req.body.uuid;
    const type = "News";

    // Create and Store the new tile
    const result = await NewsTile.create({
        "uuid": uuid,
        "tileName": name,
        "tileType": type,
        "tiles": []
    });
    res.json(result);
}
const handleNewsTileGet = async (req, res) => {
    const name = req.body.name;
    const uuid = req.body.uuid;
    const type = req.body.type;

    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const result = await NewsTile.find();
    res.json(result);
}

const handleNewsTileDelete = async (req, res) => {
    const uuid = req.body.uuid;
    //Delete a tile based on uuid passed in
    const result = await NewsTile.deleteOne({"uuid": uuid});
    res.json(result);
}

module.exports = { handleNewsTilePost, handleNewsTileGet, handleNewsTileDelete};
