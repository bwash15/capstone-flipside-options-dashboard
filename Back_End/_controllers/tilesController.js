const UserTile = require('../_model/userTiles');

const updateTileInfo = async (req, res) => {
    const stockName = req.body.stockName;
    const stockPrice = req.body.price;
    const premium = req.body.premium;
    const optionUUID = req.body.uuid;
    const tileUUID = req.body.tileUUID;
    const expDate = req.body.expDate;

    // Update existing tile with new array information
    const result = await UserTile.updateOne(
        {uuid: tileUUID},
        {$push: {
                    tiles:{
                        "stockName": stockName,
                        "stockPrice": stockPrice,
                        "premium": premium,
                        "uuid": optionUUID,
                        "expDate": expDate
                    }
                }
        }
    );
    res.json(result);
}

const tileGet = async (req, res) => {
    //Finds all tiles in the collection -> going to be changed to finding all tiles based on user id
    const tileUUID = req.body.uuid;
    const result = await UserTile.findOne({uuid: tileUUID});
    res.json(result);
}

const tileDelete = async (req, res) => {
    const tileUUID = req.body.tileUUID;
    const optionUUID = req.body.optionUUID;
    //Delete a tile based on uuid passed in
    const result = await UserTile.updateOne(
        {
            "uuid": tileUUID
        },
        {
            $pull: {
                tiles: {
                    uuid: optionUUID
                }
            }
        }
        );
    res.json(result);
}

module.exports = {updateTileInfo, tileGet, tileDelete};