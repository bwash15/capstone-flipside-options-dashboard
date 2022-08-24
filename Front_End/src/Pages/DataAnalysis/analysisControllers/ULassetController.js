import { underlying_assetApi } from '../api/analysis_axios';
import { useNavigate } from 'react-router-dom';

const HandleGetUnderlyingAsset = async ({ setUnderlyingAsset }) => {
    try {
        const underlyingAssetResponse = await underlying_assetApi.get('/underlying_asset');
        if (underlyingAssetResponse && underlyingAssetResponse.data) setUnderlyingAsset(underlyingAssetResponse.data);
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

const HandleUnderlyingAssetSubmit = async ({ setUnderlyingAsset, ULDataArray, setULDataArray, change_to_break_even, setChangeToBreakEven, last_updated, setULlastUpdated, price, setPrice, ticker, setULTicker, timeframe, setULTimeFrame }) => {

    const newUnderlyingAsset = {
        change_to_break_even: change_to_break_even,
        last_updated: last_updated,
        price: price,
        ticker: ticker,
        timeFrame: timeframe
    };

    try {
        const response = await underlying_assetApi.post('/underlying_asset', newUnderlyingAsset);
        const allUnderlyingAsset = [...ULDataArray, response.data];
        setULDataArray(allUnderlyingAsset);
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

const HandleUnderlyingAssetEdit = async ({ id, underlyingAsset, editUnderlyingAsset,
    setEditUnderlyingAsset,
    editChangeToBreakEven,
    setEditChangeToBreakEven,
    editULlastUpdated,
    setEditULlastUpdated,
    editPrice,
    setEditPrice,
    editULTicker,
    setEditULTicker,
    editULTimeFrame,
    setEditULTimeFrame }) => {

    const newUnderlyingAsset = {
        change_to_break_even: editChangeToBreakEven,
        last_updated: editULlastUpdated,
        price: editPrice,
        ticker: editULTicker,
        timeFrame: editULTimeFrame
    };
    try {
        const editunderlyingAssetResponse = await underlying_assetApi.put(`/underlying_asset/${id}`, newUnderlyingAsset);
        setEditUnderlyingAsset(editUnderlyingAsset.map(_underlying_asset => _underlying_asset.id === id ? { ...editunderlyingAssetResponse.data } : underlyingAsset));
        setEditChangeToBreakEven('');
        setEditULlastUpdated('');
        setEditPrice('');
        setEditULTicker('');
        setEditULTimeFrame('');

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

const HandleUnderlyingAssetDelete = async ({ setUnderlyingAsset, id }) => {
    const navigate = useNavigate()
    try {
        await underlying_assetApi.delete(`/underlying_asset/${id}`);
        const updatedUnderlyingAsset = await underlying_assetApi.get('/underlying_asset');
        setUnderlyingAsset(updatedUnderlyingAsset);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetUnderlyingAsset, HandleUnderlyingAssetSubmit, HandleUnderlyingAssetEdit, HandleUnderlyingAssetDelete }