const UserTile = require('../_model/newsTiles');
const fetchOption = require("isomorphic-fetch");

const updateTileInfo = async (req, res) => {
    const stockName = req.body.stockName;
    const newsUUID = req.body.newsUUID;
    const tileUUID = req.body.tileUUID;
    //GET API INFO FROM POLYGON
    const api_link =`https://api.polygon.io/v2/reference/news?ticker=${stockName}&apiKey=` + process.env.API_KEY;

    const response = await fetchOption(api_link);
    const data = await response.json();
    const news_link = data['results'][0]['article_url'];
    const image_url = data['results'][0]['image_url'];
    const description = data['results'][0]['description'];
    const title = data['results'][0]['title'];
    const result = await UserTile.updateOne(
        {uuid: tileUUID},
        {$push: 
            {tiles:
                {
                    "uuid": newsUUID,
                    "stockName": stockName,
                    "news_link": news_link,
                    "image_url": image_url,
                    "description": description,
                    "title": title
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
    const newsUUID = req.body.newsUUID;
    //Delete a tile based on uuid passed in
    const result = await UserTile.updateOne(
        {
            "uuid": tileUUID
        },
        {
            $pull: {
                tiles: {
                    uuid: newsUUID
                }
            }
        }
        );
    res.json(result);
}

module.exports = {updateTileInfo, tileGet, tileDelete};
