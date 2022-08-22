import React, { useState, useEffect, useRef } from 'react';
import { HandleFiltersSubmit, HandleFilterEdit } from '../../analysisControllers/filtersController';
import { LoadAppData } from '../../utils/loadData';

export default function FiltersSelect({ aggFilters, setAggFilters, url_links, setURLlinks, setAggregatesLink, setSnapShotLink }) {

    const [snapBaseURL, setSnapBaseURL] = useState(`https://api.polygon.io/v3/snapshot/options`);
    const [aggBaseURL, setAggBaseURL] = useState(`https://api.polygon.io/v2/aggs/ticker`);
    const [tickerBaseURL, setTickerBaseURL] = useState(`https://api.polygon.io/v3/reference/tickers`);
    const [newsBaseURL, setNewsBaseURL] = useState(`https://api.polygon.io/v2/reference/news`);

    const [linkBaseURLs, setLinkBaseURLs] = useState([
        snapBaseURL,
        aggBaseURL,
        tickerBaseURL,
        newsBaseURL,
    ]);

    const [option_type, setOption_type] = useState("");
    const [option_expire_date, setOption_expire_date] = useState("");
    const [option_ticker, setOptionTicker] = useState("");
    const [option_strike_price, setOption_strike_price] = useState("");
    const [option_ticker_link, setOptionTickerLink] = useState("");
    const [option_multiplier, setOption_multiplier] = useState("");
    const [option_timespan, setOption_timespan] = useState("");
    const [option_from, setOption_from] = useState("");
    const [option_to, setOption_To] = useState("");

    const [API_KEY, setAPI_KEY] = useState('MNExhabeDDgHYLqKlxDoT79JUdvT_OaI');

    useEffect(() => {
        setOption_type(aggFilters.option_type);
        setOption_expire_date(aggFilters.option_expire_date);
        setOptionTicker(aggFilters.option_ticker);
        setOption_strike_price(aggFilters.option_strike_price);
        setOptionTickerLink(`O:${aggFilters.option_ticker}${aggFilters.option_expire_date}${aggFilters.option_type}${aggFilters.option_strike_price}`);
        setOption_multiplier(aggFilters.option_multiplier);
        setOption_timespan(aggFilters.option_timespan);
        setOption_from(aggFilters.option_from);
        setOption_To(aggFilters.option_to);
    }, [aggFilters])

    console.log(`SnapShotLink: ${url_links[0]}\nAggregatesLink: ${url_links[1]}`);

    setAggregatesLink(`${linkBaseURLs[1]}/${option_ticker_link}/range/${option_multiplier}/${option_timespan}/${option_to}/${option_from}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`);
    setSnapShotLink(`${linkBaseURLs[0]}/${option_ticker}/${option_ticker_link}?apiKey=${API_KEY}`);

    console.log(`SnapShotLink: ${url_links[0]}\nAggregatesLink: ${url_links[1]}`);

    const _setAggregatesLink = async (e) => {
        e.preventDefault();
        setAggregatesLink(`${linkBaseURLs[1]}/${option_ticker_link}?apiKey=${API_KEY}`);
        console.log(url_links[1]);
    }

    const _handleFilterSubmit = async (e) => {
        e.preventDefault();
        HandleFiltersSubmit(linkBaseURLs[1], aggFilters, setAggFilters, setOptionTickerLink, setAggregatesLink, setSnapShotLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, option_ticker_link)

    }

    // const _handleFilterEdit = async (e, id) => {
    //     e.preventDefault();
    //     HandleFilterEdit(id, editOption_type, editOption_expire_date, editOption_ticker, editOption_strike_price, editOption_multiplier, editOption_timespan, editOption_from, editOption_to, setEditOption_type, setEditOption_expire_date, setEditOptionTicker, setEditOption_strike_price, setEditOption_multiplier, setEditOption_timespan, setEditOption_from, setEditOption_to, setEditAggFilters, editAggFilters, setEditOptionTickerLink)

    // }

    const _handleClearFormFilters = async (e) => {
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

    return (
        <section className='aggFiltersArea'>
            <form className='newAggFiltersForm' >
                <label htmlFor="option_ticker">Ticker:
                    <label htmlFor='option_ticker'></label>
                    <input
                        type="text"
                        id="option_ticker"
                        name="option_ticker"
                        value={option_ticker}
                        onChange={(e) => setOptionTicker(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_type">Type:
                    <label htmlFor='option_type'></label>
                    <input
                        type="text"
                        id="option_type"
                        name="option_type"
                        value={option_type}
                        onChange={(e) => setOption_type(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_expire_date">Expire Date:
                    <label htmlFor='option_expire_date'></label>
                    <input
                        type="text"
                        id="option_expire_date"
                        name="option_expire_date"
                        value={option_expire_date}
                        onChange={(e) => setOption_expire_date(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_strike_price">Strike Price:
                    <label htmlFor='option_strike_price'></label>
                    <input
                        type="text"
                        id="option_strike_price"
                        name="option_strike_price"
                        value={option_strike_price}
                        onChange={(e) => setOption_strike_price(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_multiplier">Multiplier:
                    <label htmlFor='option_multiplier'></label>
                    <input
                        type="text"
                        id="option_multiplier"
                        name="option_multiplier"
                        value={option_multiplier}
                        onChange={(e) => setOption_multiplier(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_timespan">Time Span:
                    <label htmlFor='option_timespan'></label>
                    <input
                        type="text"
                        id="option_timespan"
                        name="option_timespan"
                        value={option_timespan}
                        onChange={(e) => setOption_timespan(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_from">From Date:
                    <label htmlFor='option_from'></label>
                    <input
                        type="text"
                        id="option_from"
                        name="option_from"
                        value={option_from}
                        onChange={(e) => setOption_from(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_to">To Date:
                    <label htmlFor='option_to'></label>
                    <input
                        type="text"
                        id="option_to"
                        name='option_to'
                        value={option_to}
                        onChange={(e) => setOption_To(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={_handleClearFormFilters}>Clear Aggregate Filters</button>
            </form>
            <p className='newAggFiltersForm'>
                <label >Selected Base URL: </label><br />
                <label >{snapBaseURL}</label>
                <label>Current API Request: </label><br />
                <label >{option_ticker_link}</label>
                <label>Update API Request To: </label><br />
                <label >O:{option_ticker}{option_expire_date}{option_type}{option_strike_price}</label>
                <button
                    type="submit"
                    onClick={_setAggregatesLink}>Update Aggregate Filters</button>
                <br />

                <button type='submit' onClick={(url_links) => { LoadAppData(url_links) }}>Pull new SnapShot</button>
            </p>
        </section>

    )

}