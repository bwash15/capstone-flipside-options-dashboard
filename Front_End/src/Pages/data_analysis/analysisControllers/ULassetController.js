import underlyingAssetApi from '../../data_analysis/api/underlying_asset';
import { useNavigate } from 'react-router-dom';

const HandleGetUnderlyingAsset = async ({ setUnderlyingAsset }) => {
    try {
        const underlyingAssetResponse = await underlyingAssetApi.get('/underlying_asset');
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

const HandleUnderlyingAssetSubmit = async ({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame }) => {

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
        const editunderlyingAssetResponse = await underlyingAssetApi.put(`/underlying_asset/${id}`, newUnderlyingAsset);
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
        await underlyingAssetApi.delete(`/underlying_asset/${id}`);
        const updatedUnderlyingAsset = await underlyingAssetApi.get('/underlying_asset');
        setUnderlyingAsset(updatedUnderlyingAsset);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetUnderlyingAsset, HandleUnderlyingAssetSubmit, HandleUnderlyingAssetEdit, HandleUnderlyingAssetDelete }