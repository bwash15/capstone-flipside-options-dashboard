const express = require('express');
const router = express.Router();

const SnapShotAPIpull = require('../_model/SnapShotAPIpull');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('apiActivity', (msg, path, filename) => logServerEvents(msg, path, filename));
//myEmitter.on('apiA', (msg, path, filename) => logServerEvents(msg, path, filename));



const GetAllSnapShotAPIpulls = async (req, res) => {
  // Checking if Day Data Exists
  const snapShots = await SnapShotAPIpull.find();
  if (!snapShots) {
    myEmitter.emit(`snapShotAPIControllerActivity`, `SnapShot Data search returned no results: ${snapShots}`, 'apiActivityLogs', 'getSnapShots/snapShotAPIController');
    return res.status(204).json({ 'Message': 'No SnapShot Data found ' })
  };
  myEmitter.emit(`snapShotAPIControllerActivity`, `SnapShot Data search successful: ${JSON.stringify(snapShots)}`, 'apiActivityLogs', 'getSnapShots/snapShotAPIController');
  res.json(snapShots);
}


const CreateNewSnapShotAPIpull = async (req, res) => {
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
  if (!req?.body?.results.day.last_updated) {
    myEmitter.emit(`apiActivity`, ` last_Updated not found: [${req.body.results.day.last_updated}] `, 'serverAPILogs', 'APIpullDayData.txt');
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

  try {

    const newSnapShotAPIpull = await SnapShotAPIpull.create({
      request_id: req.body.request_id,
      results: {
        break_even_price: req.body.results.break_even_price,
        day: {
          change: req.body.results.day.change,
          change_percent: req.body.results.day.change_percent,
          close: req.body.results.day.close,
          high: req.body.results.day.high,
          last_Updated: req.body.results.day.last_updated,
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
    res.status(201).json(newSnapShotAPIpull);
  } catch (err) {
    myEmitter.emit(`snapShotControllerActivity`, ` New SnapShot Data Creation Failed: ${newSnapShotAPIpull}`, 'apiActivityLogs', 'createNewsnapShot/snapShotController');
    console.error(err);
  }

}

const UpdateSnapShotAPIpull = async (req, res) => {
  // Finds the API pull by the request ID
  //-----------------------------------------------------------------
  {
    if (!req?.body?.request_id) {
      {
        myEmitter.emit(`apiActivity`, ` Request ID not found: ${req.body.request_id} `, 'apiActivityLogs', 'updateSnapShots/snapShotAPIController');
      };
    }
  }

  const SnapShotData = await SnapShotAPIpull.findOne({ _id: req.body.id }).exec();
  if (!SnapShotData) {
    // request may have been made properly -> it just doesn't exist
    return res.status(204).json({ "Message": `SnapShot Data ID ${req.body.id} not found - UpdateSnapShotAPIpull` });
  }
  if (req.body?.request_id) SnapShotData.request_id = req.body.request_id;
  if (req.body?.results?.break_even_price) SnapShotData.results.break_even_price = req.body.results.break_even_price;
  if (req.body?.day.change) SnapShotData.results.day.change = req.body.results.day.change;
  if (req.body?.day.change_percent) SnapShotData.results.day.change_percent = req.body.results.day.change_percent;
  if (req.body?.day.close) SnapShotData.results.day.close = req.body.results.day.close;
  if (req.body?.day.high) SnapShotData.results.day.high = req.body.results.day.high;
  if (req.body?.day.last_updated) SnapShotData.results.day.last_updated = req.body.results.day.last_updated;
  if (req.body?.day.low) SnapShotData.results.day.low = req.body.results.day.low;
  if (req.body?.day.open) SnapShotData.results.day.open = req.body.results.day.open;
  if (req.body?.day.previous_close) SnapShotData.results.day.previous_close = req.body.results.day.previous_close;
  if (req.body?.day.volume) SnapShotData.results.day.volume = req.body.results.day.volume;
  if (req.body?.day.vwap) SnapShotData.results.day.vwap = req.body.results.day.vwap;
  if (req.body?.details.contract_type) SnapShotData.results.details.contract_type = req.body.results.details.contract_type;
  if (req.body?.details.exercise_style) SnapShotData.results.details.exercise_style = req.body.results.details.exercise_style;
  if (req.body?.details.expiration_date) SnapShotData.results.details.expiration_date = req.body.results.details.expiration_date;
  if (req.body?.details.shares_per_contract) SnapShotData.results.details.shares_per_contract = req.body.results.details.shares_per_contract;
  if (req.body?.details.strike_price) SnapShotData.results.details.strike_price = req.body.results.details.strike_price;
  if (req.body?.details.ticker) SnapShotData.results.details.ticker = req.body.results.details.ticker;
  if (req.body?.greeks.delta) SnapShotData.results.greeks.delta = req.body.results.greeks.delta;
  if (req.body?.greeks.gamma) SnapShotData.results.greeks.gamma = req.body.results.greeks.gamma;
  if (req.body?.greeks.theta) SnapShotData.results.greeks.theta = req.body.results.greeks.theta;
  if (req.body?.greeks.vega) SnapShotData.results.greeks.vega = req.body.results.greeks.vega;
  if (req.body?.last_quote.ask) SnapShotData.results.last_quote.ask = req.body.results.last_quote.ask;
  if (req.body?.last_quote.ask_size) SnapShotData.results.last_quote.ask_size = req.body.results.last_quote.ask_size;
  if (req.body?.last_quote.bid) SnapShotData.results.last_quote.bid = req.body.results.last_quote.bid;
  if (req.body?.last_quote.bid_size) SnapShotData.results.last_quote.bid_size = req.body.results.last_quote.bid_size;
  if (req.body?.last_quote.last_updated) SnapShotData.results.last_quote.last_updated = req.body.results.last_quote.last_updated;
  if (req.body?.last_quote.midPoint) SnapShotData.results.last_quote.midPoint = req.body.results.last_quote.midPoint;
  if (req.body?.last_quote.timeframe) SnapShotData.results.last_quote.timeframe = req.body.results.last_quote.timeframe;
  if (req.body?.underlying_asset.change_to_break_even) SnapShotData.results.underlying_asset.change_to_break_even = req.body.results.underlying_asset.change_to_break_even;
  if (req.body?.underlying_asset.last_updated) SnapShotData.results.underlying_asset.last_updated = req.body.results.underlying_asset.last_updated;
  if (req.body?.underlying_asset.price) SnapShotData.results.underlying_asset.price = req.body.results.underlying_asset.price;
  if (req.body?.underlying_asset.ticker) SnapShotData.results.underlying_asset.ticker = req.body.results.underlying_asset.ticker;
  if (req.body?.underlying_asset.timeframe) SnapShotData.results.underlying_asset.timeframe = req.body.results.underlying_asset.timeframe;
  if (req.body?.status) SnapShotData.results.status = req.body.status;


  // Save to DB
  const result = await SnapShotData.save();
  // Sending the data back in [response]
  res.status(201).json(result);

}

const DeleteSnapShotAPIpull = async (req, res) => {
  // Finds the API pull by the request ID
  if (!req?.body?.id) {
    return res.status(400).json({ 'Message': 'No SnapShot ID found to search by, or it is in the wrong format... Please try again' });
  }
  const SnapShotData = await SnapShotAPIpull.findOne({ _id: req.body.id }).exec();
  if (!SnapShotData) {
    return res.status(204).json({ "message": `SnapShotPull RequestID ${req.body.request_id} not found` });
  }
  const result = await SnapShotData.deleteOne({ _id: req.body.id });
  res.json(result);
}

const GetSnapShotAPIpull = async (req, res) => {
  // Finds the API pull by the request ID
  if (!req?.params?.request_id) return res.status(400).json({ 'Message': ' No SnapShot Id found in URL' });
  const SnapShotData = await SnapShotAPIpull.findOne({ _id: req.params.request_id }).exec();
  if (!SnapShotData) { return res.status(204).json({ "message": `optionPull RequestID ${req.params.request_id} not found` }); }
  // using params here because it is 
  // going to pull it directly from the URL
  res.json(SnapShotData);
}


module.exports = {
  GetAllSnapShotAPIpulls,
  CreateNewSnapShotAPIpull,
  UpdateSnapShotAPIpull,
  DeleteSnapShotAPIpull,
  GetSnapShotAPIpull
}



