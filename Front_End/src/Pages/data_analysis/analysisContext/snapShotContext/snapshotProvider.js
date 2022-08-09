import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HandleGetSnapShots, HandleSnapShotSubmit, HandleSnapShotEdit, HandleSnapShotDelete } from "../../analysisControllers/snapShotController";
import { useDayData } from './analysisHooks/useAnalysisProviders/useDayProvider';
import { useDetailsData } from './analysisHooks/useAnalysisProviders/useDetailsProvider';
import { useGreeksData } from './analysisHooks/useAnalysisProviders/useGreeksProvider';
import { useLastQuoteData } from './analysisHooks/useAnalysisProviders/useLastQuoteProvider';
import { useULAData } from './analysisHooks/useAnalysisProviders/useULAProvider';

const SnapShotContext = createContext({});

export const SnapShotProvider = ({ children }) => {
    const navigate = useNavigate();

    const { day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, editChange, editChangePercent, editClose, editHigh, editDayLastUpdated, editLow, editOpen, editPreviousClose, editVolume, editVwap, setEditChange, setEditChangePercent, setEditClose, setEditHigh, setEditDayLastUpdated, setEditLow, setEditOpen, setEditPreviousClose, setEditVolume, setEditVwap } = useDayData();

    const { details, setDetails, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker } = useDetailsData();

    const { greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega } = useGreeksData();

    const { lastQuote, setLastQuote, ask, setAsk, askSize, setAskSize, bid, setBid, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame } = useLastQuoteData();

    const { underlyingAsset, setUnderlyingAsset, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame } = useULAData();

    const [request_id, setRequestId] = useState('d9ff18dac69f55c218f69e4753706acd');
    const [breakEvenPrice, setBreakEvenPrice] = useState([]);
    const [impliedVolatility, setImpliedVolatility] = useState([]);
    const [openInterest, setOpenInterest] = useState([]);
    const [status, setStatus] = useState([]);
    const [editRequest_id, setEditRequestId] = useState([]);
    const [editBreakEvenPrice, setEditBreakEvenPrice] = useState([]);
    const [editImpliedVolatility, setEditImpliedVolatility] = useState([]);
    const [editOpenInterest, setEditOpenInterest] = useState([]);
    const [editStatus, setEditStatus] = useState([]);
    const [editssLastEdited, setEditSSlastEdited] = useState([]);

    const [singleProps, setSingleProps] = useState([{
        break_even_price: breakEvenPrice,
        implied_volatility: impliedVolatility,
        open_interest: openInterest
    }]);

    const [snapShots, setSnapShots] = useState([{
        request_id: request_id,
        results: {
            break_even_price: breakEvenPrice,
            day: day,
            details: details,
            greeks: greeks,
            implied_volatility: impliedVolatility,
            last_quote: lastQuote,
            open_interest: openInterest,
            underlying_asset: underlyingAsset
        },
        status: status,
    }]);


    const _handleGetSnapShots = async (e, setSnapShots) => {
        e.preventDefault();
        await HandleGetSnapShots(setSnapShots)
        navigate('/');
    }
    //---------------------------------------------------------------------------------------------------------------------
    const _handleSnapShotSubmit = async (e) => {
        e.preventDefault();
        HandleSnapShotSubmit({ snapShots, setSnapShots, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status, setStatus })
        navigate('/');
    }
    //----------------------------------------------------------------------------------------------------------------------
    const _handleSnapShotEdit = async (e, id) => {
        e.preventDefault();
        await HandleSnapShotEdit(id, snapShots, setSnapShots,
            editRequest_id, setEditRequestId, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, editStatus, setEditStatus)
        navigate('/');
    }
    const _handleSnapShotDelete = async (e, id) => {
        e.preventDefault();
        await HandleSnapShotDelete(id)
        navigate('/');
    }


    return (
        <SnapShotContext.Provider value={{ day, setDay, _handleSnapShotDelete, _handleGetSnapShots, _handleSnapShotEdit, _handleSnapShotSubmit, snapShots, setSnapShots, singleProps, setSingleProps, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, request_id, setRequestId, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status, setStatus, editRequest_id, setEditRequestId, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, editStatus, setEditStatus }}>
            {children}
        </SnapShotContext.Provider>
    )
}
export { SnapShotContext };
