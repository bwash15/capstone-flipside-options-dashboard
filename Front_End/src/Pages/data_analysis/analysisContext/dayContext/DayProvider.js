import { createContext, useState } from "react";
import { HandleGetDays, HandleDaySubmit, HandleDayEdit, HandleDayDelete } from '../../analysisControllers/dayController';
import { useNavigate } from 'react-router-dom';
const DayContext = createContext({});

export const DayProvider = ({ children }) => {
    const navigate = useNavigate();
    const [change, setChange] = useState([]);
    const [changePercent, setChangePercent] = useState([]);
    const [close, setClose] = useState([]);
    const [high, setHigh] = useState([]);
    const [daylastUpdated, setDayLastUpdated] = useState([]);
    const [low, setLow] = useState([]);
    const [open, setOpen] = useState([]);
    const [previousClose, setPreviousClose] = useState([]);
    const [volume, setVolume] = useState([]);
    const [vwap, setVwap] = useState([]);
    const [day, setDay] = useState([{
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
    }]);

    const [editChange, setEditChange] = useState([]);
    const [editChangePercent, setEditChangePercent] = useState([]);
    const [editClose, setEditClose] = useState([]);
    const [editHigh, setEditHigh] = useState([]);
    const [editDayLastUpdated, setEditDayLastUpdated] = useState([]);
    const [editLow, setEditLow] = useState([]);
    const [editOpen, setEditOpen] = useState([]);
    const [editPreviousClose, setEditPreviousClose] = useState([]);
    const [editVolume, setEditVolume] = useState([]);
    const [editVwap, setEditVwap] = useState([]);
    const [editDay, setEditDay] = useState([{
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
    }]);

    const _handleGetDays = async (e) => {
        e.preventDefault();
        await HandleGetDays({ setDay })
        navigate('/');
    }
    const _handleDaySubmit = async (e) => {
        e.preventDefault();
        await HandleDaySubmit({ day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap })
        navigate('/');
    }
    const _handleDayEdit = async (e, id) => {
        e.preventDefault();
        await HandleDayEdit({ id, day, setDay, editChange, editChangePercent, editClose, editHigh, editDayLastUpdated, editLow, editOpen, editPreviousClose, editVolume, editVwap, setEditChange, setEditChangePercent, setEditClose, setEditHigh, setEditDayLastUpdated, setEditLow, setEditOpen, setEditPreviousClose, setEditVolume, setEditVwap })
        navigate('/');
    }
    const _handleDayDelete = async (e, id) => {
        e.preventDefault();
        await HandleGetDays(id)
        navigate('/');
    }


    return (
        <DayContext.Provider value={{ _handleDaySubmit, _handleDayDelete, _handleDayEdit, _handleGetDays, day, setDay, editDay, setEditDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap }}>
            {children}
        </DayContext.Provider>
    )
}
export { DayContext }
