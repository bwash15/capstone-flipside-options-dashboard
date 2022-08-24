import { dayApi } from '../api/analysis_axios';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../../../../../hooks/useAuth';

const HandleGetDays = async ({ setDay }) => {
    try {
        const DayResponse = await dayApi.get('day');
        if (DayResponse && DayResponse.data) setDay(DayResponse.data);
        return DayResponse;
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

const HandleDaySubmit = async ({ dayDataArray, setDayDataArray, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, dayLastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap }) => {

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
        const response = await dayApi.post('day', newDay);
        const allDay = [...dayDataArray, response.data];
        setDayDataArray(allDay);
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

const HandleDayEdit = async ({ id, day, setDay, editChange, editChangePercent, editClose, editHigh, editDayLastUpdated, editLow, editOpen, editPreviousClose, editVolume, editVwap, setEditChange, setEditChangePercent, setEditClose, setEditHigh, setEditDayLastUpdated, setEditLow, setEditOpen, setEditPreviousClose, setEditVolume, setEditVwap }) => {

    const newDay = {
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
    };
    try {
        const editDayResponse = await dayApi.put(`day/${id}`, newDay);
        setDay(day.map(_day => _day.id === id ? { ...editDayResponse.data } : day));
        setEditChange('');
        setEditPreviousClose('');
        setEditChangePercent('');
        setEditClose('');
        setEditHigh('');
        setEditDayLastUpdated('');
        setEditLow('');
        setEditOpen('');
        setEditVolume('');
        setEditVwap('');

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

const HandleDayDelete = async ({ setDay, id }) => {
    const navigate = useNavigate()
    try {
        await dayApi.delete(`day/${id}`);
        const updatedDay = await dayApi.get('day');
        setDay(updatedDay);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetDays, HandleDaySubmit, HandleDayEdit, HandleDayDelete }