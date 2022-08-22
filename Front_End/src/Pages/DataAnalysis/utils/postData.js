import dayApi from '../api/day';
import detailsApi from '../../Data_analysis/api/details';
import filtersApi from '../api/filters';
import greeksApi from '../api/greeks';
import last_quoteApi from '../api/last_quote';
import postsApi from '../api/posts';
import underlyingAssetApi from '../api/underlying_asset';
import snapShotApi from '../api/snapShots';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
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
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
        id,
        title: postTitle,
        dateTime,
        body: postBody
    };

    try {
        const response = await postsApi.post('/posts', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostBody('');
        setPostTitle('');

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

const SnapShotDataToDB = async ({ snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status }) => {

    const navigate = useNavigate()

    const newSingleProps = {
        break_even_price: breakEvenPrice,
        implied_volatility: impliedVolatility,
        open_interest: openInterest
    }

    const newDayData = {
        change: change,
        change_percent: changePercent,
        close: close,
        high: high,
        last_updated: daylastUpdated,
        low: low,
        open: open,
        previous_close: previousClose,
        volume: volume,
        vwap: vwap
    }

    const newDetailsData = {
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    }

    const newGreeksData = {
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    }

    const newLastQuoteData = {
        ask: ask,
        askSize: askSize,
        bid: bid,
        bidSize: bidSize,
        last_updated: LQlast_updated,
        midpoint: midpoint,
        timeFrame: LQtimeFrame
    }

    const newUnderlyingAssetData = {
        change_to_break_even: changeToBreakEven,
        last_updated: ULlastUpdated,
        price: price,
        ticker: ULTicker,
        timeFrame: ULtimeFrame
    }

    const newSnapShot = {
        request_id: request_id,
        results: {
            break_even_price: newSingleProps.break_even_price,
            day: newDayData,
            details: newDetailsData,
            greeks: newGreeksData,
            implied_volatility: newSingleProps.implied_volatility,
            last_quote: newLastQuoteData,
            open_interest: newSingleProps.open_interest,
            underlying_asset: newUnderlyingAssetData
        },
        status: status,
    };
    try {
        const response = await snapShotApi.post('/snapShots', newSnapShot);
        const allSnapShots = [...snapShots, response.data];
        setSnapShots(allSnapShots);
        setSnapShotArray(allSnapShots);
        setDay(newDayData);
        setDetails(newDetailsData);
        setGreeks(newGreeksData);
        setLastQuote(newLastQuoteData);
        setUnderlyingAsset(newUnderlyingAssetData)

        // Resetting State on the Form
        setRequestId('');
        setBreakEvenPrice('');
        setDay('');
        setChange('');
        setChangePercent('');
        setClose('');
        setHigh('');
        setDayLastUpdated('');
        setLow('');
        setOpen('');
        setPreviousClose('');
        setVolume('');
        setVwap('');
        setDetails('');
        setContractType('');
        setExerciseStyle('');
        setExpirationDate('');
        setSharesPerContract('');
        setStrikePrice('');
        setDetailsTicker('');
        setImpliedVolatility('');
        setGreeks('');
        setDelta('');
        setGamma('');
        setTheta('');
        setVega('');
        setOpenInterest('');
        setLastQuote('');
        setAsk('');
        setAskSize('');
        setBid('');
        setBidSize('');
        setLQlast_updated('');
        setMidpoint('');
        setLQtimeFrame('');
        setUnderlyingAsset('');
        setChangeToBreakEven('');
        setULlastUpdated('');
        setPrice('');
        setULTicker('');
        setULTimeFrame('');
        navigate('/');

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

//------------------------------------------------------------------------

const DayDataToDB = async ({ day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, dayLastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap }) => {

    const newDay = {
        change: change,
        change_percent: changePercent,
        close: close,
        high: high,
        last_updated: dayLastUpdated,
        low: low,
        open: open,
        previous_close: previousClose,
        volume: volume,
        vwap: vwap
    };

    try {
        const response = await dayApi.post('/day', newDay);
        const allDay = [...day, response.data];
        setDay(allDay);
        setChange('');
        setPreviousClose('');
        setChangePercent('');
        setClose('');
        setHigh('');
        setDayLastUpdated('');
        setLow('');
        setOpen('');
        setVolume('');
        setVwap('');


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
//------------------------------------------------------------------------

const DetailsDataToDB = async ({ details, setDetails, contractType, exerciseStyle, expirationDate, sharesPerContract, strikePrice, detailsTicker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker }) => {

    const newDetails = {
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    };

    try {
        const response = await detailsApi.post('/details', newDetails);
        const allDetails = [...details, response.data];
        setDetails(allDetails);
        setContractType('');
        setExerciseStyle('');
        setExpirationDate('');
        setSharesPerContract('');
        setStrikePrice('');
        setDetailsTicker('');

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
//------------------------------------------------------------------------

const GreeksDataToDB = async ({ greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega }) => {

    const newGreeks = {
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    };

    try {
        const response = await greeksApi.post('/greeks', newGreeks);
        const allGreeks = [...greeks, response.data];
        setGreeks(allGreeks);
        setDelta('');
        setGamma('');
        setTheta('');
        setVega('');
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
//------------------------------------------------------------------------

const LastQuoteDataToDB = async ({ lastQuote, setLastQuote, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame }) => {

    const newLastQuote = {
        ask: ask,
        ask_size: askSize,
        bid: bid,
        bid_size: bidSize,
        last_updated: LQlast_updated,
        midpoint: midpoint,
        timeFrame: LQtimeFrame
    };

    try {
        const response = await last_quoteApi.post('/last_quote', newLastQuote);
        const allLastQuote = [...lastQuote, response.data];
        setLastQuote(allLastQuote);
        setAsk('');
        setAskSize('');
        setBid('');
        setBidSize('');
        setLQlast_updated('');
        setMidpoint('');
        setLQtimeFrame('');

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
//------------------------------------------------------------------------

const UnderlyingAssetDataToDB = async ({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame }) => {

    const newUnderlyingAsset = {
        change_to_break_even: changeToBreakEven,
        last_updated: ULlastUpdated,
        price: price,
        ticker: ULTicker,
        timeFrame: ULtimeFrame
    };

    try {
        const response = await underlyingAssetApi.post('/underlying_asset', newUnderlyingAsset);
        const allUnderlyingAsset = [...underlyingAsset, response.data];
        setUnderlyingAsset(allUnderlyingAsset);
        setChangeToBreakEven('');
        setULlastUpdated('');
        setPrice('');
        setULTicker('');
        setULTimeFrame('');

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

export { PostsDataToDB, PostAllDataToDB, SnapShotDataToDB, DayDataToDB, DetailsDataToDB, GreeksDataToDB, LastQuoteDataToDB, UnderlyingAssetDataToDB }

