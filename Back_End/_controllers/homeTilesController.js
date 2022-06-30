
const HomeTile = require('../_model/UserHomeTiles');
const handleUserTilesPost = async (req, res) => {
    const names = req.body.tileNames;
    const userID = req.body.userID;
    const uuid = req.body.uuid;
    // Create and Store the new tile to home list
    let result;
    await HomeTile.updateOne(
        {
            "userID": userID
        },
        {
            "uuid": uuid,
            "userID": userID,
            "tileNames": []
        }, 
        {
            upsert: true
        }
    );
    for(const name of names){
       result = await HomeTile.updateOne(
            {userID: userID},
            {$addToSet: 
                {tileNames:
                    {
                        "tileName": name,
                    }
                }
            }
        );
    }

    res.json(result);
}

const handleUserTilesGet = async (req, res) => {
    const userID = req.body.userID;
    // Create and Store the new tile to home list
    
    const result = await HomeTile.findOne({
        "userID": userID
    });
    try {
        let list = [];
        result.tileNames.forEach(element => {
            list.push(element.tileName) 
        });
        console.log("result is " + list)
        res.json(list);
    } catch (error) {
        console.log("error with result");
    }

}

module.exports = { handleUserTilesPost, handleUserTilesGet};