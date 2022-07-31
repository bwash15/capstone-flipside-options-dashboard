import filtersApi from '../../data_analysis/api/analysis_axios';
import { useNavigate } from 'react-router-dom';

const HandleGetFilters = async ({ setFilters }) => {
    try {
        const filtersResponse = await filtersApi.get('/analysis_axios/filtersApi');
        if (filtersResponse && filtersResponse.data) setFilters(filtersResponse.data);
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

const HandleFiltersSubmit = async ({ snapShotBaseUrl, filters, setFilters, setOptionTickerLink, setSnapShotLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, option_ticker_link }) => {

    const newFilters = {
        option_type: option_type,
        option_expire_date: option_expire_date,
        option_ticker: option_ticker,
        option_strike_price: option_strike_price,
        option_ticker_link: option_ticker_link,
        option_multiplier: option_multiplier,
        option_timespan: option_timespan,
        option_from: option_from,
        option_to: option_to,
    };

    try {
        const filtersResponse = await filtersApi.post('./filters', newFilters);
        const allFilters = [...filters, filtersResponse];
        setFilters(allFilters);
        console.log(allFilters);
        setOptionTickerLink(`O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`);
        setSnapShotLink(`${snapShotBaseUrl}${option_ticker}/${option_ticker_link}${option_expire_date}${option_type}${option_strike_price}?apiKey=${process.env.REACT_APP_API_KEY}`);

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

const HandleFilterEdit = async ({ id, editOption_type, editOption_expire_date, editOption_ticker, editOption_strike_price, editOption_multiplier, editOption_timespan, editOption_from, editOption_to, setEditOption_type, setEditOption_expire_date, setEditOptionTicker, setEditOption_strike_price, setEditOption_multiplier, setEditOption_timespan, setEditOption_from, setEditOption_to, setFilters, filters, setEditOptionTickerLink }) => {

    const updatedFilters = {
        editOption_type: editOption_type,
        editOption_expire_date: editOption_expire_date,
        editOption_ticker: editOption_ticker,
        editOption_strike_price: editOption_strike_price,
        editOption_multiplier: editOption_multiplier,
        editOption_timespan: editOption_timespan,
        editOption_from: editOption_from,
        editOption_to: editOption_to,
    };
    try {
        const editFiltersResponse = await filtersApi.put(`/filtersApi/${id}`, updatedFilters);
        setFilters(filters.map(filter => filter.option_ticker_link === id ? { ...editFiltersResponse.data } : filter));
        setEditOption_type('');
        setEditOption_expire_date('');
        setEditOptionTicker('');
        setEditOption_strike_price('');
        setEditOptionTickerLink('');
        setEditOption_multiplier('');
        setEditOption_timespan('');
        setEditOption_from('');
        setEditOption_to('');

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

const HandleFiltersDelete = async ({ setFilters, id }) => {
    const navigate = useNavigate()
    try {
        await filtersApi.delete(`/filters/${id}`);
        const updatedFilters = await filtersApi.get('/filters');
        setFilters(updatedFilters);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleFiltersSubmit, HandleFiltersDelete, HandleGetFilters, HandleFilterEdit }
