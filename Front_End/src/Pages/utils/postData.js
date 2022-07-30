
import { HandlePostSubmit } from '../data_analysis/analysisControllers/postsController';
import { HandleSnapShotSubmit } from '../data_analysis/analysisControllers/snapShotController'
import { HandleDaySubmit } from '../data_analysis/analysisControllers/dayController';
import { HandleDetailsSubmit } from '../data_analysis/analysisControllers/detailsController';
import { HandleGreeksSubmit } from '../data_analysis/analysisControllers/greeksController';
import { HandleLastQuoteSubmit } from '../data_analysis/analysisControllers/lastQuoteController';
import { HandleUnderlyingAssetSubmit } from '../data_analysis/analysisControllers/ULassetController';

// Impor Data Model Schemas for Mongoose



const PostAllDataToDB = async ({ posts, postTitle, postBody, setPosts, setPostBody, setPostTitle, snapShots, setSnapShots, setSnapShotArray, day, setDay, details, setDetails, greeks, setGreeks, lastQuote, setLastQuote, underlyingAsset, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status }) => {

    // MongoDB connection is through the data models 


    // Bringing all Data together to update the DataBase with    
    await PostsDataToDB(posts, postTitle, postBody, setPosts, setPostBody, setPostTitle);

    await SnapShotDataToDB(snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status);

    await DayDataToDB({ day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap });

    await DetailsDataToDB({ details, setDetails, contractType, exerciseStyle, expirationDate, sharesPerContract, strikePrice, detailsTicker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker });

    await GreeksDataToDB({ greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega });

    await LastQuoteDataToDB({ lastQuote, setLastQuote, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame });

    await UnderlyingAssetDataToDB({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame });

}

//-------------------------------------------------------------------------------------------------------------------------------------------------

const PostsDataToDB = async ({ posts, postTitle, postBody, setPosts, setPostBody, setPostTitle }) => {
    // Bringing all Handle posts together for an Update DataBase    
    await HandlePostSubmit(posts, postTitle, postBody, setPosts, setPostBody, setPostTitle);

}

const SnapShotDataToDB = async ({ snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status }) => {

    await HandleSnapShotSubmit(snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status)
}

//------------------------------------------------------------------------

const DayDataToDB = async ({ day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, dayLastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap }) => {

    await HandleDaySubmit({ day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, dayLastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap })

}
//------------------------------------------------------------------------

const DetailsDataToDB = async ({ details, setDetails, contractType, exerciseStyle, expirationDate, sharesPerContract, strikePrice, detailsTicker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker }) => {

    await HandleDetailsSubmit({ details, setDetails, contractType, exerciseStyle, expirationDate, sharesPerContract, strikePrice, detailsTicker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker })
}
//------------------------------------------------------------------------

const GreeksDataToDB = async ({ greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega }) => {

    await HandleGreeksSubmit({ greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega })
}
//------------------------------------------------------------------------

const LastQuoteDataToDB = async ({ lastQuote, setLastQuote, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame }) => {

    await HandleLastQuoteSubmit({ lastQuote, setLastQuote, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame })
}
//------------------------------------------------------------------------

const UnderlyingAssetDataToDB = async ({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame }) => {

    await HandleUnderlyingAssetSubmit({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame })
}

export { PostsDataToDB, PostAllDataToDB, SnapShotDataToDB, DayDataToDB, DetailsDataToDB, GreeksDataToDB, LastQuoteDataToDB, UnderlyingAssetDataToDB }

