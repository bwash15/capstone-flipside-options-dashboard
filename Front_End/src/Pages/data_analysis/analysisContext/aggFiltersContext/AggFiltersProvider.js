import { createContext, useState } from "react";
import { HandleFilterEdit, HandleFiltersSubmit, HandleFiltersDelete } from '../../analysisControllers/filtersController';
import { useNavigate } from 'react-router-dom';
const AggFiltersContext = createContext({});

export const AggFiltersProvider = ({ children }) => {
    const navigate = useNavigate();

    const [option_type, setOption_type] = useState("");
    const [option_expire_date, setOption_expire_date] = useState("");
    const [option_ticker, setOptionTicker] = useState("");
    const [option_strike_price, setOption_strike_price] = useState();
    const [option_ticker_link, setOptionTickerLink] = useState(`O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`);
    const [option_multiplier, setOption_multiplier] = useState();
    const [option_timespan, setOption_timespan] = useState("");
    const [option_from, setOption_from] = useState("");
    const [option_to, setOption_To] = useState("");

    const [editOption_type, setEditOption_type] = useState("");
    const [editOption_expire_date, setEditOption_expire_date] = useState("");
    const [editOption_ticker, setEditOptionTicker] = useState("");
    const [editOption_strike_price, setEditOption_strike_price] = useState();
    const [editOption_ticker_link, setEditOptionTickerLink] = useState(`O:${editOption_ticker}${editOption_expire_date}${editOption_type}${editOption_strike_price}`);
    const [editOption_multiplier, setEditOption_multiplier] = useState(0);
    const [editOption_timespan, setEditOption_timespan] = useState("");
    const [editOption_from, setEditOption_from] = useState("");
    const [editOption_to, setEditOption_to] = useState("");

    const [apiKey, setApiKey] = useState(process.env.api_key);

    const [snapShotBaseUrl, setApiBaseUrl] = useState('https://api.polygon.io/v3/snapshot/options/');
    const [apiAggBaseUrl, setApiAggBaseUrl] = useState('https://api.polygon.io/v2/aggs/ticker/');
    const [apiTickersBaseUrl, setApiTickersBaseUrl] = useState('https://api.polygon.io/v3/reference/tickers');

    const [aggLink, setAggLink] = useState(`${apiAggBaseUrl}${option_ticker_link}/range/${option_multiplier}/${option_timespan}/${option_from}/${option_to}?apiKey=${apiKey}`);
    const [snapShotLink, setSnapShotLink] = useState(`${snapShotBaseUrl}${option_ticker}/${option_ticker_link}${option_expire_date}${option_type}${option_strike_price}?apiKey=${apiKey}`);

    const _handleFilterSubmit = async (e) => {
        e.preventDefault();
        HandleFiltersSubmit(snapShotBaseUrl, aggFilters, setAggFilters, setOptionTickerLink, setSnapShotLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, option_ticker_link)
        navigate('/');
    }

    const _handleFilterEdit = async (e, id) => {
        e.preventDefault();
        HandleFilterEdit(id, editOption_type, editOption_expire_date, editOption_ticker, editOption_strike_price, editOption_multiplier, editOption_timespan, editOption_from, editOption_to, setEditOption_type, setEditOption_expire_date, setEditOptionTicker, setEditOption_strike_price, setEditOption_multiplier, setEditOption_timespan, setEditOption_from, setEditOption_to, setEditAggFilters, editAggFilters, setEditOptionTickerLink)
        navigate('/');
    }

    const [aggFilters, setAggFilters] = useState([{
        option_type: option_type,
        option_expire_date: option_expire_date,
        option_ticker: option_ticker,
        option_strike_price: option_strike_price,
        option_ticker_link: option_ticker_link,
        option_multiplier: option_multiplier,
        option_timespan: option_timespan,
        option_from: option_from,
        option_to: option_to
    }]);

    const [editAggFilters, setEditAggFilters] = useState([{
        editOption_type: editOption_type,
        editOption_expire_date: editOption_expire_date,
        editOption_ticker: editOption_ticker,
        editOption_strike_price: editOption_strike_price,
        editOption_ticker_link: editOption_ticker_link,
        editOption_multiplier: editOption_multiplier,
        editOption_timespan: editOption_timespan,
        editOption_from: editOption_from,
        editOption_to: editOption_to
    }]);

    const handleClearFormFilters = async (e) => {
        e.preventDefault();

        setOption_type('');
        setOption_expire_date('');
        setOptionTicker('');
        setOption_strike_price('');
        setOption_multiplier('');
        setOption_timespan('');
        setOption_from('');
        setOption_To('');
    }



    // This does not hold the token or cookie > it holds a boolean to say 
    // whether we trust the device or not


    return (
        <AggFiltersContext.Provider value={{ _handleFilterEdit, _handleFilterSubmit, apiAggBaseUrl, aggLink, setAggLink, snapShotLink, setSnapShotLink, handleClearFormFilters, aggFilters, setAggFilters, option_type, setOption_type, option_expire_date, setOption_expire_date, option_ticker, setOptionTicker, option_strike_price, setOption_strike_price, option_multiplier, setOption_multiplier, option_timespan, setOption_timespan, option_from, setOption_from, option_to, setOption_To }}>
            {children}
        </AggFiltersContext.Provider>
    )


}
export { AggFiltersContext };
