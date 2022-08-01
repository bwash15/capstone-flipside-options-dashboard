const Details = require('../_model/Details');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('detailsControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

const getAllOptionDetails = async (req, res) => {
    // Checking if Details Data Exists
    const details = await Details.find();
    if (!details) {
        myEmitter.emit(`detailsControllerActivity`, `Details Data search returned no results: ${details}`, 'apiActivityLogs', 'getDetails/detailsController');
        return res.status(204).json({ 'Message': 'No Details Data found ' })
    };
    myEmitter.emit(`detailsControllerActivity`, `details Data search successful: ${JSON.stringify(details)}`, 'apiActivityLogs', 'getDetails/detailsController');
    res.json(details);
}

const createNewOptionDetails = async (req, res) => {
    if (!req?.body?.contract_type || !req?.body?.exercise_style || !req?.body?.expiration_date || !req?.body?.shares_per_contract || !req?.body?.strike_price || !req?.body?.ticker) {
        return res.status(400).json({ 'Message': ' Did not pull in all Details Data fields' });
    }
    try {
        const result = await Details.create({
            contract_type: req.body.contract_type,
            exercise_style: req.body.exercise_style,
            expiration_date: req.body.expiration_date,
            shares_per_contract: req.body.shares_per_contract,
            strike_price: req.body.strike_price,
            ticker: req.body.ticker
        })
        // Sending a status 201 for success
        res.status(201).json(result);
    } catch (err) {
        myEmitter.emit(`detailsControllerActivity`, ` New Details Data Creation Failed: ${JSON.stringify(day)}`, 'apiActivityLogs', 'getDetails/detailsController');
        console.error(err);
    }
}

const updateOptionDetails = async (req, res) => {
    // Checks if there exists an Details ID
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Details Id parameter required, No Day Id Found' });
    }
    // Compares the auto generated _id to the ID that was passed in 
    const DetailsData = await Details.findOne({ _id: req.body.id }).exec();
    if (!DetailsData) {
        // request may have been made properly -> it just doesn't exist
        return res.status(204).json({ "Message": `Details Data ID ${req.body.id} not found` });
    }
    if (req.body?.contract_type) DetailsData.contract_type = req.body.contract_type;
    if (req.body?.exercise_style) DetailsData.exercise_style = req.body.exercise_style;
    if (req.body?.expiration_date) DetailsData.expiration_date = req.body.expiration_date;
    if (req.body?.shares_per_contract) DetailsData.shares_per_contract = req.body.shares_per_contract;
    if (req.body?.strike_price) DetailsData.strike_price = req.body.strike_price;
    if (req.body?.ticker) DetailsData.ticker = req.body.ticker;

    // Save to DB
    const result = await DetailsData.save();
    // Send data in response
    res.status(201).json(result);
}

const deleteOptionDetail = async (req, res) => {
    // Checks the Details ID
    if (!req?.body?.id) {
        return res.status(400).json({ 'Message': 'No Details Id Found' });
    }
    const DetailsData = await Details.findOne({ _id: req.body.id }).exec();
    if (!DetailsData) {
        return res.status(204).json({ "Message": `Details Data ID ${req.body.id} not found` })
    }
    const result = await DetailsData.deleteOne({ _id: req.body.id })
    res.json(result);
}


const getOptionDetail = async (req, res) => {
    // Checks the Details ID
    if (!req?.params?.id) return res.status(400).json({ 'Message': 'No Details Id Found in URL' })
    const DetailsData = await Details.findOne({ _id: req.params.id }).exec();
    if (!DetailsData) {
        return res.status(204).json({ "Message": `Details Data ID ${req.params.day_id} not found` });
    }
    res.json(DetailsData);
}


module.exports = {
    getAllOptionDetails,
    createNewOptionDetails,
    updateOptionDetails,
    deleteOptionDetail,
    getOptionDetail
}

