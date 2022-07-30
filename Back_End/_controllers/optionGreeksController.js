const Greeks = require('../_model/Greeks');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

const getAllOptionGreeks = async (req, res) => {
    // Checking if Greeks Data Exists
    const greeks = await Greeks.find();
    if (!greeks) {
        myEmitter.emit(`greeksControllerActivity`, `Greeks Data search returned no results: ${greeks}`, 'apiActivityLogs', 'getGreeks/greeksController');
        return res.status(204).json({ 'Message': 'No Greeks Data found ' })
    };
    myEmitter.emit(`greeksControllerActivity`, `Greeks Data search successful: ${JSON.stringify(greeks)}`, 'apiActivityLogs', 'getGreeks/greeksController');
    res.json(greeks);
}

const createNewOptionGreeks = async (req, res) => {
    if (!req?.body?.delta || !req?.body?.gamma || !req?.body?.theta || !req?.body?.vega) {
        return res.status(400).json({ 'Message': ' Did not pull in all Greeks Data fields' });
    };

    try {
        const result = await Greeks.create({
            delta: req.body.delta,
            gamma: req.bdoy.gamma,
            theta: req.body.theta,
            vega: req.body.vega
        });
        res.status(201).json(result);
    } catch (err) {
        myEmitter.emit(`greeksControllerActivity`, `Greeks Data Creation Failed: ${JSON.stringify(result)}`, 'apiActivityLogs', 'createNewGreeks/greeksController');
        console.error(err);
    };
}

const updateOptionGreeks = async (req, res) => {
    // Checks the Greeks ID
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'No Greeks Id Found' });
    }
    const GreeksData = await Greeks.findOne({ _id: req.body.id }).exec();
    if (!GreeksData) {
        return res.status(204).json({ "message": `Greeks Id ${req.body.greeks_id} Not Found` });
    }
    if (req.body?.delta) GreeksData.delta = req.body.delta;
    if (req.body?.gamma) GreeksData.gamma = req.body.gamma;
    if (req.body?.theta) GreeksData.theta = req.body.theta;
    if (req.body?.vega) GreeksData.vega = req.body.vega;
    // Save to DB
    const result = await GreeksData.save();
    // Send data in response
    res.json(result);
}

const deleteOptionGreeks = async (req, res) => {
    // Checks if there exists an Greeks ID
    if (!req?.body?.id) {
        return res.status(400).json({ 'Message': 'No Greeks Id Found' });
    }
    // Compares the Mongo auto generated _id to the ID that was passed in 
    const GreeksData = await Greeks.findOne({ _id: req.body.id }).exec();
    if (!GreeksData) {
        // request may have been made properly -> it just doesn't exist
        return res.status(204).json({ "message": `Greeks ID ${req.body.id} Not Found` });
    }
    const result = await GreeksData.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getOptionGreek = async (req, res) => {
    // Checks the Greeks ID
    // using params here because it is going to pull it directly from the URL
    if (!req?.params?.id) return res.status(400).json({ 'Message': 'No Greeks Id Found in URL' })
    const greeks = await Greeks.findOne({ _id: req.params.id });
    if (!greeks) {
        return res.status(400).json({ "message": `Greeks ID ${req.params._id} Not Found` });
    }
    res.json(greeks);
}

module.exports = {
    getAllOptionGreeks,
    createNewOptionGreeks,
    updateOptionGreeks,
    deleteOptionGreeks,
    getOptionGreek
}
