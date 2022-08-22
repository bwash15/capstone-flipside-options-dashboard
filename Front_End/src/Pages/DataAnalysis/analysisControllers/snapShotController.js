import { snapShotsApi } from '../api/analysis_axios';
import { useNavigate } from 'react-router-dom';


const HandleGetSnapShots = async ({ setSnapShot }) => {
    try {
        const SnapShotResponse = await snapShotsApi.get('/snapShots');
        if (SnapShotResponse && SnapShotResponse.data) setSnapShot(SnapShotResponse.data);
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


const HandleSnapShotSubmit = async ({ snapShot, setSnapShotArray, snapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset }) => {
    const navigate = useNavigate()

    const newSingleProps = {
        break_even_price: snapShot.breakEvenPrice,
        implied_volatility: snapShot.impliedVolatility,
        open_interest: snapShot.openInterest
    }
    console.log(newSingleProps);

    const newDayData = {
        change: snapShot.change,
        change_percent: snapShot.changePercent,
        close: snapShot.close,
        high: snapShot.high,
        last_updated: snapShot.daylastUpdated,
        low: snapShot.low,
        open: snapShot.open,
        previous_close: snapShot.previousClose,
        volume: snapShot.volume,
        vwap: snapShot.vwap
    }
    console.log(newDayData);

    const newDetailsData = {
        contract_type: snapShot.contractType,
        exercise_style: snapShot.exerciseStyle,
        expiration_date: snapShot.expirationDate,
        shares_per_contract: snapShot.sharesPerContract,
        strike_price: snapShot.strikePrice,
        ticker: snapShot.detailsTicker
    }
    console.log(newDetailsData);

    const newGreeksData = {
        delta: snapShot.delta,
        gamma: snapShot.gamma,
        theta: snapShot.theta,
        vega: snapShot.vega
    }
    console.log(newGreeksData);

    const newLastQuoteData = {
        ask: snapShot.ask,
        askSize: snapShot.askSize,
        bid: snapShot.bid,
        bidSize: snapShot.bidSize,
        last_updated: snapShot.LQlast_updated,
        midpoint: snapShot.midpoint,
        timeFrame: snapShot.LQtimeFrame
    }
    console.log(newLastQuoteData);

    const newUnderlyingAssetData = {
        change_to_break_even: snapShot.changeToBreakEven,
        last_updated: snapShot.ULlastUpdated,
        price: snapShot.price,
        ticker: snapShot.ULTicker,
        timeFrame: snapShot.ULtimeFrame
    }
    console.log(newUnderlyingAssetData);

    const newSnapShot = {
        request_id: snapShot.request_id,
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
        status: snapShot.status,
    };
    console.log(newSnapShot);
    try {
        const response = await snapShotsApi.post('/snapShots', snapShot);
        const allSnapShots = [...snapShotArray, response.data];
        //setSnapShot('');
        setSnapShotArray(allSnapShots);
        setDay(newDayData);
        setDetails(newDetailsData);
        setGreeks(newGreeksData);
        setLastQuote(newLastQuoteData);
        setUnderlyingAsset(newUnderlyingAssetData)

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

const HandleSnapShotEdit = async ({ id,
    snapShots, setSnapShots, setSnapShotArray, setEditDay, setEditDetails, setEditGreeks, setEditLastQuote, setEditUnderlyingAsset,
    editRequest_id, setEditRequestId, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, editStatus, setEditStatus
}) => {
    const navigate = useNavigate()

    const updatedSnapShot = {
        request_id: editRequest_id,
        results: {
            break_even_price: editBreakEvenPrice,
            day: {
                change: editChange,
                change_percent: editChangePercent,
                close: editClose,
                high: editHigh,
                last_updated: editDayLastUpdated,
                low: editLow,
                open: editOpen,
                previous_close: editPreviousClose,
                volume: editVolume,
                vwap: editVwap
            },
            details: {
                contract_type: editContractType,
                exercise_style: editExerciseStyle,
                expiration_date: editExpirationDate,
                shares_per_contract: editSharesPerContract,
                strike_price: editStrikePrice,
                ticker: editDetailsTicker
            },
            greeks: {
                delta: editDelta,
                gamma: editGamma,
                theta: editTheta,
                vega: editVega
            },
            implied_volatility: editImpliedVolatility,
            last_quote: {
                ask: editAsk,
                askSize: editAskSize,
                bid: editBid,
                bidSize: editBidSize,
                last_updated: editLQlast_updated,
                midpoint: editMidpoint,
                timeFrame: editLQtimeFrame
            },
            open_interest: editOpenInterest,
            underlying_asset: {
                change_to_break_even: editChangeToBreakEven,
                last_updated: editULlastUpdated,
                price: editPrice,
                ticker: editULticker,
                timeFrame: editULtimeFrame
            }
        },
        status: editStatus
    };
    try {
        const editSnapShotResponse = await snapShotsApi.put(`/snapShots/${id}`, updatedSnapShot);
        setSnapShots(snapShots.map(_snapShot => _snapShot.request_id === id ? { ...editSnapShotResponse.data } : snapShots));
        // Set Edits back to empty String
        setEditRequestId('');
        setEditBreakEvenPrice('');
        setEditDay('');
        setEditChange('');
        setEditChangePercent('');
        setEditClose('');
        setEditHigh('');
        setEditDayLastUpdated('');
        setEditLow('');
        setEditOpen('');
        setEditPreviousClose('');
        setEditVolume('');
        setEditVwap('');
        setEditDetails('');
        setEditContractType('');
        setEditExerciseStyle('');
        setEditExpirationDate('');
        setEditSharesPerContract('');
        setEditStrikePrice('');
        setEditDetailsTicker('');
        setEditGreeks('');
        setEditDelta('');
        setEditGamma('');
        setEditTheta('');
        setEditVega('');
        setEditImpliedVolatility('');
        setEditLastQuote('');
        setEditAsk('');
        setEditAskSize('');
        setEditBid('');
        setEditBidSize('');
        setEditLQlast_updated('');
        setEditMidpoint('');
        setEditLQtimeFrame('');
        setEditOpenInterest('');
        setEditUnderlyingAsset('');
        setEditChangeToBreakEven('');
        setEditULlastUpdated('');
        setEditPrice('');
        setEditULticker('');
        setEditULtimeFrame('');
        setEditStatus('');
        navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const HandleSnapShotDelete = async ({ setSnapShots, id }) => {
    const navigate = useNavigate()
    try {
        await snapShotsApi.delete(`/snapShots/${id}`);
        const SnapShotResponse = await snapShotsApi.get('/snapshots');
        setSnapShots(SnapShotResponse);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetSnapShots, HandleSnapShotSubmit, HandleSnapShotEdit, HandleSnapShotDelete }