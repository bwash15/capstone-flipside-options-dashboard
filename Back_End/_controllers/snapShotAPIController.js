const express = require('express');
const router = express.Router();

const SnapShotAPIpull = require('../_model/SnapShotAPIpull');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('apiActivity', (msg, path, filename) => logServerEvents(msg, path, filename));
//myEmitter.on('apiA', (msg, path, filename) => logServerEvents(msg, path, filename));



const getAllOptionAPIpulls = (req, res) => {
  res.json(data.optionAPIpull);
}

const createNewOptionAPIpull = (req, res) => {

  if (!req?.body?.request_id) {
    myEmitter.emit(`apiActivity`, ` Request ID not found: ${req.body.request_id} `, 'serverAPILogs', 'APIpulldata.txt');
  }
  //------------------------------------------------------------------
  if (!req?.body?.results.break_even_price) {
    myEmitter.emit(`apiActivity`, ` break_even_price not found: [${req.body.results.break_even_price}] `, 'serverAPILogs', 'APIpulldata.txt');
  };
  //------------------------------------------------------------------
  //                                                             DAY
  if (!req?.body?.results.day.change) {
    myEmitter.emit(`apiActivity`, ` Day change not found: [${req.body.results.day.change}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //-----------------------------------------------------------------
  if (!req?.body?.results.day.change_percent) {
    myEmitter.emit(`apiActivity`, ` Day Change Percent not found: [${req.body.results.day.change_percent}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.close) {
    myEmitter.emit(`apiActivity`, ` Day close not found: [${req.body.results.day.close}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.high) {
    myEmitter.emit(`apiActivity`, ` Day high not found: [${req.body.results.day.high}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.last_Updated) {
    myEmitter.emit(`apiActivity`, ` last_Updated not found: [${req.body.results.day.last_Updated}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.low) {
    myEmitter.emit(`apiActivity`, ` Day low not found: [${req.body.results.day.low}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.open) {
    myEmitter.emit(`apiActivity`, ` Day open not found: [${req.body.results.day.open}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.previous_close) {
    myEmitter.emit(`apiActivity`, ` Day previous close not found: [${req.body.results.day.previous_close}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.volume) {
    myEmitter.emit(`apiActivity`, ` Day volume not found: [${req.body.results.day.volume}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.day.vwap) {
    myEmitter.emit(`apiActivity`, ` Day vwap not found: [${req.body.results.day.vwap}] `, 'serverAPILogs', 'APIpullDayData.txt');
  };
  //------------------------------------------------------------------
  //                                                          DETAILS
  if (!req?.body?.results.details.contract_type) {
    myEmitter.emit(`apiActivity`, ` Contract type not found: [${req.body.results.details.contract_type}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  //                                                         
  if (!req?.body?.results.details.exercise_style) {
    myEmitter.emit(`apiActivity`, ` Exercise style not found: [${req.body.results.details.exercise_style}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.details.expiration_date) {
    myEmitter.emit(`apiActivity`, ` Expiration Date not found: [${req.body.results.details.expiration_date}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.details.shares_per_contract) {
    myEmitter.emit(`apiActivity`, ` Shares_per_contract not found: [${req.body.results.details.shares_per_contract}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.details.strike_price) {
    myEmitter.emit(`apiActivity`, ` Strike Price not found: [${req.body.results.details.strike_price}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.details.ticker) {
    myEmitter.emit(`apiActivity`, ` Ticker not found: [${req.body.results.details.ticker}] `, 'serverAPILogs', 'APIpullDetailsData.txt');
  };
  //------------------------------------------------------------------
  //                                                            Greeks
  if (!req?.body?.results.greeks.delta) {
    myEmitter.emit(`apiActivity`, ` Greeks - Delta not found: [${req.body.results.greeks.delta}] `, 'serverAPILogs', 'APIpullGreeksData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.greeks.gamma) {
    myEmitter.emit(`apiActivity`, ` Greeks - Gamma not found: [${req.body.results.greeks.gamma}] `, 'serverAPILogs', 'APIpullGreeksData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.greeks.theta) {
    myEmitter.emit(`apiActivity`, ` Greeks - Theta not found: [${req.body.results.greeks.theta}] `, 'serverAPILogs', 'APIpullGreeksData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.greeks.vega) {
    myEmitter.emit(`apiActivity`, ` Greeks - Vega not found: [${req.body.results.greeks.vega}] `, 'serverAPILogs', 'APIpullGreeksData.txt');
  };
  //                                                mal014Implied Volatility
  //------------------------------------------------------------------
  if (!req?.body?.results.implied_volatility) {
    myEmitter.emit(`apiActivity`, ` Implied_volatility not found: [${req.body.results.implied_volatility}] `, 'serverAPILogs', 'APIpullimpliedvolatilityData.txt');
  };
  //------------------------------------------------------------------
  //                                                        Last_Quote
  if (!req?.body?.results.last_quote.ask) {
    myEmitter.emit(`apiActivity`, ` Last quote - Ask not found: [${req.body.results.last_quote.ask}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.ask_size) {
    myEmitter.emit(`apiActivity`, ` Last quote - Ask_size not found: [${req.body.results.last_quote.ask_size}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.bid) {
    myEmitter.emit(`apiActivity`, ` Last quote - Bid not found: [${req.body.results.last_quote.bid}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.bid_size) {
    myEmitter.emit(`apiActivity`, ` Last quote - Bid_size not found: [${req.body.results.last_quote.bid_size}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.last_updated) {
    myEmitter.emit(`apiActivity`, ` Last quote - Last_updated not found: [${req.body.results.last_quote.last_updated}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.midPoint) {
    myEmitter.emit(`apiActivity`, ` Last quote - MidPoint not found: [${req.body.results.last_quote.midPoint}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.last_quote.timeframe) {
    myEmitter.emit(`apiActivity`, ` Last quote - Time Frame not found: [${req.body.results.last_quote.timeframe}] `, 'serverAPILogs', 'APIpullLastQuoteData.txt');
  };
  //                                                    Open Interest
  //------------------------------------------------------------------
  if (!req?.body?.results.open_interest) {
    myEmitter.emit(`apiActivity`, ` Open Interest not found: [${req.body.results.open_interest}] `, 'serverAPILogs', 'APIpullOpenInterestData.txt');
  };
  //------------------------------------------------------------------
  //                                                  Underlying Asset
  if (!req?.body?.results.underlying_assetschema.change_to_break_even) {
    myEmitter.emit(`apiActivity`, ` Underlying Asset - Change_to_break_even not found: [${req.body.results.underlying_assetschema.change_to_break_even}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.underlying_assetschema.last_updated) {
    myEmitter.emit(`apiActivity`, ` Underlying Asset - Last_updated not found: [${req.body.results.underlying_assetschema.last_updated}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.underlying_assetschema.price) {
    myEmitter.emit(`apiActivity`, ` Underlying Asset - Price not found: [${req.body.results.underlying_assetschema.price}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.underlying_assetschema.ticker) {
    myEmitter.emit(`apiActivity`, ` Underlying Asset - Ticker not found: [${req.body.results.underlying_assetschema.ticker}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.results.underlying_assetschema.timeframe) {
    myEmitter.emit(`apiActivity`, ` Underlying Asset - Time Frame not found: [${req.body.results.underlying_assetschema.timeframe}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  };
  //------------------------------------------------------------------
  if (!req?.body?.status) {
    myEmitter.emit(`apiActivity`, ` Status not found: [${req.body.status}] `, 'serverAPILogs', 'APIpullUnderlyingAssetData.txt');
  }
  //------------------------------------------------------------------
  if (!req?.body?.status) {
    return res.status(400).json({ 'message': ' Did not pull in all API Option Pull fields' });
  }

  const newOptionAPIpull = await SnapShotAPIpull.create({
    request_id: req.body.request_id,
    results: {
      break_even_price: req.body.results.break_even_price,
      day: {
        change: req.body.results.day.change,
        change_percent: req.body.results.day.change_percent,
        close: req.body.results.day.close,
        high: req.body.results.day.high,
        last_Updated: req.body.results.day.last_Updated,
        low: req.body.results.day.low,
        open: req.body.results.day.open,
        previous_close: req.body.results.day.previous_close,
        volume: req.body.results.day.volume,
        vwap: req.body.results.day.vwap
      },
      details: {
        contract_type: req.body.results.details.contract_type,
        exercise_style: req.body.results.details.exercise_style,
        expiration_date: req.body.results.details.expiration_date,
        shares_per_contract: req.body.results.details.shares_per_contract,
        strike_price: req.body.results.details.strike_price,
        ticker: req.body.results.details.ticker
      },
      greeks: {
        delta: req.body.results.greeks.delta,
        gamma: req.body.results.greeks.gamma,
        theta: req.body.results.greeks.theta,
        vega: req.body.results.greeks.vega
      },
      implied_volatility: req.body.results.implied_volatility,
      last_quote: {
        ask: req.body.results.last_quote.ask,
        ask_size: req.body.results.last_quote.ask_size,
        bid: req.body.results.last_quote.bid,
        bid_size: req.body.results.last_quote.bid_size,
        last_updated: req.body.results.last_quote.last_updated,
        midPoint: req.body.results.last_quote.midPoint,
        timeframe: req.body.results.last_quote.timeframe
      },
      open_interest: req.body.results.open_interest,
      underlying_assetschema: {
        change_to_break_even: req.body.results.underlying_assetschema.change_to_break_even,
        last_updated: req.body.results.underlying_assetschema.last_updated,
        price: req.body.results.underlying_assetschema.price,
        ticker: req.body.results.underlying_assetschema.ticker,
        timeframe: req.body.results.underlying_assetschema.timeframe
      }
    },
    status: req.body.status
  });
  res.status(201).json(data.optionAPIpull);

}

const updateOptionAPIpull = (req, res) => {
  // Finds the API pull by the request ID
  const optionData = data.optionAPIpull.find(oapi => oapi.apiPull_id === parseInt(req.body.apiPull_id));
  if (!optionData) { return res.status(400).json({ "message": ` ApiPull_id ${req.body.apiPull_id} not found` }); }
  //-----------------------------------------------------------------
  if (req.body.request_id) {
    optionData.request_id = req.body.request_id
    myEmitter.emit(`apiActivity`, ` Request ID : ${req.body.request_id} `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Request ID not found: ${req.body.request_id} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.break_even_price) {
    optionData.results.break_even_price = req.body.results.break_even_price
    myEmitter.emit(`apiActivity`, ` Break_even_price ${req.body.results.break_even_price}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Break_even_price not found: ${req.body.results.break_even_price} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.change) {
    optionData.results.day.change = req.body.results.day.change
    myEmitter.emit(`apiActivity`, ` Day Change : ${req.body.results.day.change}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day change not found : ${req.body.results.day.change} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.change_percent) {
    optionData.results.day.change_percent = req.body.results.day.change_percent
    myEmitter.emit(`apiActivity`, ` Day Change_Percent ${req.body.results.day.change_percent}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day Change_Percent not found : ${req.body.results.day.change_percent} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.close) {
    optionData.results.day.close = req.body.results.day.close
    myEmitter.emit(`apiActivity`, ` Day Close : ${req.body.results.day.close}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day Close not found : ${req.body.results.day.close} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.high) {
    optionData.results.day.high = req.body.results.day.high
    myEmitter.emit(`apiActivity`, ` Day High : ${req.body.results.day.high}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day High not found : ${req.body.results.day.high} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.last_Updated) {
    optionData.results.day.last_Updated = req.body.results.day.last_Updated
    myEmitter.emit(`apiActivity`, ` last_Updated : ${req.body.results.day.last_Updated}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` last_Updated not found: ${req.body.results.day.last_Updated} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.low) {
    optionData.results.day.low = req.body.results.day.low
    myEmitter.emit(`apiActivity`, ` Day low : ${req.body.results.day.low} `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day low not found : ${req.body.results.day.low} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.open) {
    optionData.results.day.open = req.body.results.day.open
    myEmitter.emit(`apiActivity`, ` Day open : ${req.body.results.day.open}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day open not found : ${req.body.results.day.open} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.previous_close) {
    optionData.results.day.previous_close = req.body.results.day.previous_close
    myEmitter.emit(`apiActivity`, ` Day previous_close : ${req.body.results.day.previous_close} `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day previous_close not found :  ${req.body.results.day.previous_close} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.volume) {
    optionData.results.day.volume = req.body.results.day.volume
    myEmitter.emit(`apiActivity`, ` Day volume : ${req.body.results.day.volume}  `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, `Day volume not found : ${req.body.results.day.volume} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------
  if (req.body.results.day.vwap) {
    optionData.results.day.vwap = req.body.results.day.vwap
    myEmitter.emit(`apiActivity`, ` Day vwap : ${req.body.results.day.vwap} `, 'serverAPILogs', 'APIupdateData.txt');
  } else {
    myEmitter.emit(`apiActivity`, ` Day vwap not found : ${req.body.results.day.vwap} `, 'serverAPILogs', 'APIupdateData.txt');
  };
  //------------------------------------------------------------------

  if (req.body.results.details.contract_type) optionData.results.details.contract_type = req.body.results.details.contract_type;
  if (req.body.results.details.exercise_style) optionData.results.details.exercise_style = req.body.results.details.exercise_style;
  if (req.body.results.details.expiration_date) optionData.results.details.expiration_date = req.body.results.details.expiration_date;
  if (req.body.results.details.shares_per_contract) optionData.results.details.shares_per_contract = req.body.results.details.shares_per_contract;
  if (req.body.results.details.strike_price) optionData.results.details.strike_price = req.body.results.details.strike_price;
  if (req.body.results.details.ticker) optionData.results.details.ticker = req.body.results.details.ticker;

  if (req.body.results.greeks.delta) optionData.results.greeks.delta = req.body.results.greeks.delta;
  if (req.body.results.greeks.gamma) optionData.results.greeks.gamma = req.body.results.greeks.gamma
  if (req.body.results.greeks.theta) optionData.results.greeks.theta = req.body.results.greeks.theta;
  if (req.body.results.greeks.vega) optionData.results.greeks.vega = req.body.results.greeks.vega;

  if (req.body.results.implied_volatility) optionData.results.implied_volatility = req.body.results.implied_volatility;
  if (req.body.results.last_quote.ask) optionData.results.last_quote.ask = req.body.results.last_quote.ask;
  if (req.body.results.last_quote.ask_size) optionData.results.last_quote.ask_size = req.body.results.last_quote.ask_size;
  if (req.body.results.last_quote.bid) optionData.results.last_quote.bid = req.body.results.last_quote.bid;
  if (req.body.results.last_quote.bid_size) optionData.results.last_quote.bid_size = req.body.results.last_quote.bid_size;
  if (req.body.results.last_quote.last_updated) optionData.results.last_quote.last_updated = req.body.results.last_quote.last_updated;
  if (req.body.results.last_quote.midPoint) optionData.results.last_quote.midPoint = req.body.results.last_quote.midPoint;
  if (req.body.results.last_quote.timeframe) optionData.results.last_quote.timeframe = req.body.results.last_quote.timeframe;

  if (req.body.results.open_interest) optionData.results.open_interest = req.body.results.open_interest;
  if (req.body.results.underlying_assetschema.change_to_break_even) optionData.results.underlying_assetschema.change_to_break_even = req.body.results.underlying_assetschema.change_to_break_even;
  if (req.body.results.underlying_assetschema.last_updated) optionData.results.underlying_assetschema.last_updated = req.body.results.underlying_assetschema.last_updated;
  if (req.body.results.underlying_assetschema.price) optionData.results.underlying_assetschema.price = req.body.results.underlying_assetschema.price;
  if (req.body.results.underlying_assetschema.ticker) optionData.results.underlying_assetschema.ticker = req.body.results.underlying_assetschema.ticker;
  if (req.body.results.underlying_assetschema.timeframe) optionData.results.underlying_assetschema.timeframe = req.body.results.underlying_assetschema.timeframe;
  if (req.body.status) optionData.status = req.body.status;

  const filteredArray = data.optionAPIpull.find(oapi => oapi.apiPull_id !== parseInt(req.body.apiPull_id));
  const unsortedArray = [...filteredArray, optionData];
  data.setOptionAPIpull(unsortedArray.sort((a, b) => a.apiPull_id > b.apiPull_id ? 1 : a.apiPull_id < b.apiPull_id ? -1 : 0));
  res.json(data.optionAPIpull);

}

const deleteOptionsAPIpull = (req, res) => {
  // Finds the API pull by the request ID
  const optionData = data.optionAPIpull.find(oapi => oapi.request_id === parseInt(req.body.request_id));
  if (!optionData) { return res.status(400).json({ "message": `optionPull RequestID ${req.body.request_id} not found` }); }
  const filteredArray = data.optionAPIpull.filter(oapi => oapi.request_id !== parseInt(req.body.request_id));
  data.setOptionAPIpull = [...filteredArray];
  res.json(data.optionAPIpull);
}

const getOptionsAPIpull = (req, res) => {
  // Finds the API pull by the request ID
  const optionData = data.optionAPIpull.find(oapi => oapi.request_id === parseInt(req.params.request_id));
  if (!optionData) { return res.status(400).json({ "message": `optionPull RequestID ${req.params.request_id} not found` }); }
  // using params here because it is 
  // going to pull it directly from the URL
  res.json(optionData);
}


module.exports = {
  getAllOptionAPIpulls,
  createNewOptionAPIpull,
  updateOptionAPIpull,
  deleteOptionsAPIpull,
  getOptionsAPIpull
}



