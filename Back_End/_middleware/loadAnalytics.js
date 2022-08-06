
const Day = require('../_controllers/optionDaysController');
const Details = require('../_controllers/optionDetailsController');
const Greeks = require('../_controllers/optionGreeksController');
const LastQuote = require('../_controllers/optionLastQuoteController');
const UnderlyingAsset = require('../_controllers/underLyingAssetController');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const fetchOption = require("isomorphic-fetch");


myEmitter.on('api_pullControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));


const getFilters = async (req, res) => {
    const filters = await Filters.find();
    if (!filters) {
        myEmitter.emit(`filterControllerActivity`, `filter Data search returned no results: ${filters}`, 'apiActivityLogs', 'getFilters/API_pullController');
        return res.status(204).json({ 'Message': 'No Filter Data found ' })
    };
    myEmitter.emit(`filterControllerActivity`, `Filter Data search successful: ${JSON.stringify(filters)}`, 'apiActivityLogs', 'getFilter/filterController');
    res.json(filters);
}


const UpdateAggregatesFilters = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Aggregates Id required, No Filter _Id Found - UpdateAggregates' });
    }
    const aggregatesData = await Aggregates.findOne({ _id: req.body.id }).exec();
    if (!aggregatesData) {
        // request may have been made properly -> it just doesn't exist
        return res.status(204).json({ "Message": `Aggregates Data ID ${req.body.id} not found - UpdateAggregates` });
    }
    if (req.body?.option_type) aggregatesData.option_type = req.body.option_type;
    if (req.body?.option_expire_date) aggregatesData.option_expire_date = req.body.option_expire_date;
    if (req.body?.option_ticker) aggregatesData.option_ticker = req.body.option_ticker;
    if (req.body?.option_strike_price) aggregatesData.option_strike_price = req.body.option_strike_price;
    if (req.body?.options_ticker_link) aggregatesData.options_ticker_link = req.body.options_ticker_link;
    if (req.body?.multiplier) aggregatesData.multiplier = req.body.multiplier;
    if (req.body?.timespan) aggregatesData.timespan = req.body.timespan;
    if (req.body?.option_from) aggregatesData.option_from = req.body.option_from;
    if (req.body?.option_to) aggregatesData.option_to = req.body.option_to;

    const result = await aggregatesData.save();
    res.status(201).json(result);
}

const UpdateSnapShotsFilters = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Filter Id required, No Filter _Id Found - UpdateFilters' });
    }
    const FilterData = await Filters.findOne({ _id: req.body.id }).exec();
    if (!FilterData) {
        // request may have been made properly -> it just doesn't exist
        return res.status(204).json({ "Message": `Filters Data ID ${req.body.id} not found - UpdateFilters` });
    }
    if (req.body?.option_type) FilterData.option_type = req.body.option_type;
    if (req.body?.option_expire_date) FilterData.option_expire_date = req.body.option_expire_date;
    if (req.body?.option_ticker) FilterData.option_ticker = req.body.option_ticker;
    if (req.body?.option_strike_price) FilterData.option_strike_price = req.body.option_strike_price;
    if (req.body?.options_ticker_link) FilterData.options_ticker_link = req.body.options_ticker_link;

    const result = await FilterData.save();
    res.status(201).json(result);
}




//  Use setInterval() to set the heartbeat for the API pull
const HandleAPIpull = async (req, res, next) => {
    if (!req?.body?.option_type || !req?.body?.option_expire_date || !req?.body?.option_ticker || !req?.body?.option_strike_price || !req?.body?.options_ticker_link || !req?.body?.multiplier || !req?.body?.timespan || !req?.body?.option_from || !req?.body?.option_to) {
        console.log('Not all aggregate filters are filled in')
        return res.status(400).json({ 'Message': ' Not all aggregate filters are filled in' });
    }
    /** Define the parameters for the request URL **/

    try {
        const aggregate_result = await Filters.create({
            option_type: req.body.optionType,                             //C for call P for put
            option_expire_date: req.body.option_expire_date,                 // YearMonthDay
            option_ticker: req.body.option_ticker,          //nasdaq name for the company -> exela but the nasdaq name is XELA
            option_strike_price: req.body.option_strike_price,      //8 digit number, divide by 1000 -> this will be 1$
            options_ticker_link: `/O:${req.body.option_ticker}${req.body.option_expire_date}${req.body.option_type}${req.body.option_strike_price}`,
            multiplier: req.body.multiplier,                // minutes per minute, hours per hour, days per day, weeks per week ->o
            timespan: req.body.timespan,                            // minute, hour, day, week, month
            from: req.body.option_from,                          //start of the timeframe to look at
            to: req.body.option_to
        })


        SetoptionType(snapShot_result.option_type);
        SetStrike(snapShot_result.option_strike_price);


        const aggregate_baseUrl = `https://api.polygon.io/v2/aggs/ticker/`;
        const aggregate_link = `${aggregate_baseUrl}`;

        const snapshot_baseUrl = `https://api.polygon.io/v3/snapshot/options/`;
        const snapshot_link = `${snapshot_baseUrl}`;

        SetSnapShotLink(snapshot_link);
        HandleSnapShotPull(snapshot_link);

        SetAggregateLink(aggregate_link);
        HandleAggregatePull(aggregate_link);
        next();

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`Error: ${err.message}`);
        }
    }
}


const HandleSnapShotPull = async ({ snapshot_link }) => {
    const snapShotResponse = await fetchOption(snapshot_link, {
        // Added from here to right above console.log(error)
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        credentials: 'include',
        body: 'foo=bar&lorem=ipsum'
    })
        .then(snapShotResponse.json())
        .then(res => {
            // Handle response
            // Commented out data changed [query = data > to > query = res]
            const reqIdQuery = res['request_id'];
            const dayQuery = res['results']['day'];
            const detailsQuery = res['results']['details'];
            const greeksQuery = res['results']['greeks'];
            const lastQuoteQuery = res['results']['last_quote'];
            const underlyingAssetQuery = res['results']['underlying_assets'];
            console.log('Response: ', res);
            console.log('RequestID: ', reqIdQuery);
            console.log('Day: ', dayQuery);
            console.log('Details: ', detailsQuery);
            console.log('Greeks: ', greeksQuery);
            console.log('Last Quote: ', lastQuoteQuery);
            console.log('Underlying Asset: ', underlyingAssetQuery);



            // Send data in response
            res.status(201).json(result);


        })
        .catch(err => {
            // Handle error
            console.log('Error message: ', error);
        });
}

const HandleAggregatePull = async ({ aggregate_link }) => {
    const aggregateResponse = await fetchOption(aggregate_link, {
        // Added from here to right above console.log(error)
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        credentials: 'include',
        body: 'foo=bar&lorem=ipsum'
    })
        .then(aggregateResponse.json())
        .then(res => {
            // Handle response
            // Commented out data changed [query = data > to > query = res]
            const query = res['results']['day']['close'];
            console.log('Response: ', res);
        })
        .catch(err => {
            // Handle error
            console.log('Error message: ', error);
        });
}

const SetDayOnHeartBeat = async (res, req) => {

}

const SetSnapShotLink = async ({ req, res, snapshot_link }) => {
    if (!req?.body?.option_type || !req?.body?.option_expire_date || !req?.body?.option_ticker || !req?.body?.option_strike_price) {
        return res.status(400).json({ 'Message': ' Not all SnapShot filters are filled in' });
    }
    const NewSnapShotLink = await snapshot_link + `${req.body.option_ticker}/O:${req.body.option_ticker}${req.body.option_expire_date}${req.body.option_type}${req.body.option_strike_price}?apiKey=${process.env.REACT_APP_API_KEY}`;

    const aggregate_result = await Filters.create({
        option_type: req.body.optionType,                             //C for call P for put
        option_expire_date: req.body.option_expire_date,                 // YearMonthDay
        option_ticker: req.body.option_ticker,          //nasdaq name for the company -> exela but the nasdaq name is XELA
        option_strike_price: req.body.option_strike_price,      //8 digit number, divide by 1000 -> this will be 1$
        options_ticker_link: `/O:${req.body.option_ticker}${req.body.option_expire_date}${req.body.option_type}${req.body.option_strike_price}`,
    })
    // Save to DB
    const result = await aggregate_result.save();
    res.status(201).json.stringify(result);
}

const SetAggregateLink = async ({ req, res, aggregate_link }) => {
    if (!req?.body?.option_type || !req?.body?.option_expire_date || !req?.body?.option_ticker || !req?.body?.option_strike_price || !req?.body?.options_ticker_link || !req?.body?.multiplier || !req?.body?.timespan || !req?.body?.option_from || !req?.body?.option_to) {
        return res.status(400).json({ 'Message': ' Not all Aggregate filters are filled in' });
    }
    await aggregate_link + `${res.body.option_ticker}/O:${res.body.option_ticker}/range/${res.body.multiplier}/${res.body.timespan}/${res.body.option_from}/${res.body.option_to}?apiKey=${process.env.REACT_APP_API_KEY}`;

    res.status(201).json.stringify(aggregate_link)
}

const SetoptionType = ({ type }) => {
    if (type == 'Call') {
        return 'C';
    } else if (type == 'Put') {
        return 'P';
    }
}

const SetStrike = ({ option_strike_price }) => {
    if (stockPrice.length == 1) {
        option_strike_price = '0000' + parseInt(stockPrice) * 1000;
    } else if (stockPrice.length == 2) {
        option_strike_price = '000' + parseInt(stockPrice) * 1000;
    } else if (stockPrice.length == 3) {
        option_strike_price = '00' + parseInt(stockPrice) * 1000
    } else if (stockPrice.length == 4) {
        option_strike_price = '0' + parseInt(stockPrice) * 1000
    };
}

const SellingCallStratWeeklyReturn = (current_premium, current_strike) => {
    let price = current_premium / current_strike * 100;
    return `${price}%`;
}

module.exports = {
    HandleAPIpull,
    HandleSnapShotPull,
    HandleAggregatePull,
    SetSnapShotLink,
    SetAggregateLink,
    SetoptionType,
    SetStrike,
    SellingCallStratWeeklyReturn,
    getFilters,
    UpdateAggregatesFilters,
    UpdateSnapShotsFilters
};