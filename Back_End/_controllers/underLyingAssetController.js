const UnderlyingAsset = require('../_model/UnderlyingAsset')
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('dayControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));


const getAllUnderlyingAssets = async (req, res) => {
    const underlying_asset = await UnderlyingAsset.find();
    if (!underlying_asset) {
        myEmitter.emit(`underlyingAssetControllerActivity`, `underlyingAsset Data search returned no results: ${underlying_asset}`, 'apiActivityLogs', 'getUnderlyingAsset/UnderlyingAssetController');
        return res.status(204).json({ 'Message': 'No UnderlyingAsset Data found ' })
    };
    myEmitter.emit(`underlyingAssetControllerActivity`, `underlyingAsset Data search successful: ${JSON.stringify(underlying_asset)}`, 'apiActivityLogs', 'getUnderlyingAsset/UnderlyingAssetController');
    res.json(underlying_asset);
}

const createNewUnderlyingAsset = async (req, res) => {
    if (!req?.body?.change_to_break_even || !req?.body?.last_Updated || !req?.body?.price || !req?.body?.ticker || !req?.body?.timeframe) {
        return res.status(400).json({ 'Message': ' Did not pull in all Day Data fields' });
    }
    try {
        const result = await UnderlyingAsset.create({
            change_to_break_even: req.body.change_to_break_even,
            last_updated: req.body.last_updated,
            price: req.body.price,
            ticker: req.body.ticker,
            timeframe: req.body.timeframe
        });
        res.status(201).json(result)

    } catch (err) {
        myEmitter.emit(`underlyingAssetControllerActivity`, `UnderlyingAsset Data Creation Failed: ${JSON.stringify(result)}`, 'apiActivityLogs', 'createNewUnderlyingAsset/UnderlyingAssetController');
        console.error(err)
    }

}

const updateUnderlyingAsset = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'No Underlying Asset Id Found - UpdateUnderlyingAsset' });
    }
    const ULData = await UnderlyingAsset.findOne({ _id: req.body.id }).exec();
    if (!ULData) {
        return res.status(400).json({ "message": `Underlying Asset ${req.body.id} not found` });
    }
    if (req.body?.change_to_break_even) ULData.change_to_break_even = req.body.change_to_break_even;
    if (req.body?.last_updated) ULData.last_updated = req.body.last_updated;
    if (req.body?.price) ULData.price = req.body.price;
    if (req.body?.ticker) ULData.ticker = req.body.ticker;
    if (req.body?.timeframe) ULData.timeframe = req.body.timeframe;

    const result = await ULData.save();
    res.json(result);
}

const deleteUnderlyingAsset = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'Message': 'No UnderlyingAsset Id Found' });
    }
    const UnderlyingAssetData = await UnderlyingAsset.findOne({ _id: req.body.id }).exec();
    if (!UnderlyingAssetData) {
        return res.status(204).json({ "Message": `UnderlyingAsset Data ID ${req.body.id} not found` })
    }
    const result = await UnderlyingAssetData.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUnderlyingAsset = async (req, res) => {
    // Checks the otpionUnderlyingAssetsID
    if (!req?.params?.id) return res.status(400).json({ 'Message': 'No UnderlyingAsset Id Found in URL' })
    const UnderlyingAssetData = await UnderlyingAsset.findOne({ _id: req.params.id }).exec();
    if (!UnderlyingAssetData) {
        return res.status(204).json({ "Message": `UnderlyingAsset Data ID ${req.params.id} not found` });
    }
    res.json(UnderlyingAssetData);
}


module.exports = {
    getAllUnderlyingAssets,
    createNewUnderlyingAsset,
    updateUnderlyingAsset,
    deleteUnderlyingAsset,
    getUnderlyingAsset
}

