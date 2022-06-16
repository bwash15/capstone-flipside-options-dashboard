const UserTile = require('../_model/optionTiles');
const fetchOption = require("isomorphic-fetch");


const updateTileInfo = async (req, res) => {


    const stockName = req.body.stockName;
    const stockPrice = req.body.stockPrice;
    const optionUUID = req.body.optionUUID;
    const tileUUID = req.body.tileUUID;
    //const expDate = req.body.expDate;

    //GET API INFO FROM POLYGON
    const option_type = 'C'                             //C for call P for put
    const option_expire_date = '220617'                 // YearMonthDay
    const option_ticker = stockName;                       //nasdaq name for the company -> this comapny is called exela but the nasdaq name is XELA
    const option_strike_price = '00' + parseInt(stockPrice) * 1000;             //8 digit number, divide by 1000 -> this will be 1$
    const snapshot_link = `https://api.polygon.io/v3/snapshot/options/${option_ticker}/O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}?apiKey=${process.env.API_KEY}`

    const response = await fetchOption(snapshot_link);
    const data = await response.json();
    const query = data['results']['day']['close'];

    const result = await UserTile.updateOne(
        {uuid: tileUUID},
        {$push: 
            {tiles:
                {
                    "stockName": stockName,
                    "stockPrice": stockPrice,
                    "premium": query,
                    "uuid": optionUUID,
                    "expDate": option_expire_date
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