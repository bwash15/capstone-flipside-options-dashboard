import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HandleGetUnderlyingAsset, HandleUnderlyingAssetSubmit, HandleUnderlyingAssetEdit, HandleUnderlyingAssetDelete } from '../../analysisControllers/ULassetController';

const UnderlyingAssetContext = createContext({});

export const UnderlyingAssetProvider = ({ children }) => {
    const navigate = useNavigate()
    const [changeToBreakEven, setChangeToBreakEven] = useState([]);
    const [ULlastUpdated, setULlastUpdated] = useState([]);
    const [price, setPrice] = useState([]);
    const [ULTicker, setULTicker] = useState([]);
    const [ULtimeFrame, setULTimeFrame] = useState([]);

    const [underlyingAsset, setUnderlyingAsset] = useState([{
        change_to_break_even: changeToBreakEven,
        last_updated: ULlastUpdated,
        price: price,
        ticker: ULTicker,
        timeFrame: ULtimeFrame
    }]);
    const [editChangeToBreakEven, setEditChangeToBreakEven] = useState([]);
    const [editULlastUpdated, setEditULlastUpdated] = useState([]);
    const [editPrice, setEditPrice] = useState([]);
    const [editULticker, setEditULticker] = useState([]);
    const [editULtimeFrame, setEditULtimeFrame] = useState([]);

    const _handleGetUnderlyingAsset = async (e) => {
        e.preventDefault();
        await HandleGetUnderlyingAsset({ setUnderlyingAsset })
        navigate('/');
    }
    const _handleUnderlyingAssetSubmit = async (e) => {
        e.preventDefault();
        await HandleUnderlyingAssetSubmit({ underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame })
        navigate('/');
    }
    const _handleUnderlyingAssetEdit = async (e, id) => {
        e.preventDefault();
        await HandleUnderlyingAssetEdit({ id, underlyingAsset, setUnderlyingAsset, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame })
        navigate('/');
    }
    const _handleUnderlyingAssetDelete = async (e, id) => {
        e.preventDefault();
        await HandleUnderlyingAssetDelete({ id, setUnderlyingAsset })
        navigate('/');
    }


    return (
        <UnderlyingAssetContext.Provider value={{ _handleGetUnderlyingAsset, _handleUnderlyingAssetSubmit, _handleUnderlyingAssetEdit, _handleUnderlyingAssetDelete, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, underlyingAsset, setUnderlyingAsset, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame }}>
            {children}
        </UnderlyingAssetContext.Provider>
    )


}
export default UnderlyingAssetContext;
