import { useState, useEffect, useRef } from 'react';
import { HandleFiltersSubmit, HandleFilterEdit } from '../../analysisControllers/filtersController';
import { HandleAPIpull } from '../../utils/loadData';
import axios from 'axios';
import AggFilters from './aggFilters';
import SnapFilters from './snapFilters';

export default function FiltersSelect({ snapShotLink, aggregates_link, snapFilters, setSnapFilters, aggFilters, setAggFilters, url_links, setSnapShot, setAggregatesLink, setSnapShotLink }) {

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

    const [snap_option_type, setSnapOption_type] = useState("");
    const [snap_option_expire_date, setSnapOption_expire_date] = useState("");
    const [snap_option_ticker, setSnapOptionTicker] = useState("");
    const [snap_option_strike_price, setSnapOption_strike_price] = useState("");
    const [snap_option_ticker_link, setSnapOptionTickerLink] = useState("");

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

    if (snap_option_strike_price.length == 1) {
        option_strike_price = '0000' + parseInt(snap_option_strike_price) * 1000;
    } else if (snap_option_strike_price.length == 2) {
        option_strike_price = '000' + parseInt(snap_option_strike_price) * 1000;
    } else if (snap_option_strike_price.length == 3) {
        option_strike_price = '00' + parseInt(snap_option_strike_price) * 1000
    } else if (snap_option_strike_price.length == 4) {
        option_strike_price = '0' + parseInt(snap_option_strike_price) * 1000
    }

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
        const linkString = `${aggBaseURL}/${option_ticker_link}/range/${option_multiplier}/${option_timespan}/${option_to}/${option_from}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`
        setAggregatesLink(linkString);
        console.log(`AggregatesLink: ${aggregates_link}`);
    }, [aggFilters])

    useEffect(() => {
        setSnapOption_type(snapFilters.option_type);
        setSnapOption_expire_date(snapFilters.option_expire_date);
        setSnapOptionTicker(snapFilters.option_ticker);
        setSnapOption_strike_price(snapFilters.option_strike_price);
        setSnapOptionTickerLink(`O:${snapFilters.option_ticker}${snapFilters.option_expire_date}${snapFilters.option_type}${snapFilters.option_strike_price}`);
        const linkString = `${snapBaseURL}/${snap_option_ticker}/${snap_option_ticker_link}?apiKey=${API_KEY}`
        setSnapShotLink(linkString);
        console.log(`SnapShotLink: ${`O:${snapFilters.option_ticker}${snapFilters.option_expire_date}${snapFilters.option_type}${snapFilters.option_strike_price}`}`);
    }, [snapFilters])

    const _setAggregatesLink = async (e) => {
        e.preventDefault();
        const linkString = `${aggBaseURL}/${option_ticker_link}/range/${option_multiplier}/${option_timespan}/${option_to}/${option_from}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`
        await setAggregatesLink(linkString);
        console.log(`AggregatesLink: ${linkString}`);
        console.log(`AggregatesLink: ${aggregates_link}`);
        console.log(`URL_links_1: ${url_links[1]}`);
    }
    const _setSnapShotLink = async (e) => {
        e.preventDefault();
        const linkString = `${snapBaseURL}/${snap_option_ticker}/${snap_option_ticker_link}?apiKey=${API_KEY}`
        await setSnapShotLink(linkString);
        console.log(`LinkString: ${linkString}`);
        console.log(`SnapShotLink: ${snapShotLink}`);
        console.log(`URL_links_0: ${JSON.stringify(url_links[0])}`);
    }

    const _handleFilterSubmit = async (e) => {
        e.preventDefault();
        HandleFiltersSubmit(linkBaseURLs[1], aggFilters, setAggFilters, setOptionTickerLink, setAggregatesLink, setSnapShotLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, option_ticker_link)

    }

    const HandleAPIpull = async ({ snapShotLink, setSnapShot }) => {

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        console.log("Setting Loading to true...")
        setLoading(true);
        console.log(`Pulling Data from ${snapShotLink}`)
        await axios.get(snapShotLink)
            .then((res) => {
                // JSON DATA is the SnapShot returned from the API
                const jsonData = res.data.json();
                console.log(jsonData.request_id);
                console.log(jsonData.results);
                console.log(jsonData.status);
                setSnapShot(jsonData);
                sessionStorage.setItem("snapShots", JSON.stringify(jsonData));
                // JSON DATA.results is the SnapShot data about the requested option returned from the API
                // RequestID, Results, Status

                let optionResultsKeys = Object.keys(jsonData.results);

                // let optionKeys = Object.keys(JsonOptionsData);
                // setSnapShot(JsonOptionsData);
                // setSnapShotArray([...snapShotArray, JsonOptionsData]);
            }).catch((err) => {
                setError(err);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
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

    const _pullDataFromAPI = () => {

        HandleAPIpull(snapShotLink, setSnapShot);
    }

    return (
        <>
            <section className='aggFiltersArea'>
                <AggFilters
                    _handleClearFormFilters={_handleClearFormFilters}
                    _setAggregatesLink={_setAggregatesLink}
                    option_type={option_type}
                    option_expire_date={option_expire_date}
                    option_ticker={option_ticker}
                    option_strike_price={option_strike_price}
                    option_multiplier={option_multiplier}
                    option_timespan={option_timespan}
                    option_from={option_from}
                    option_to={option_to}
                    setOption_type={setOption_type}
                    setOption_strike_price={setOption_strike_price}
                    setOption_expire_date={setOption_expire_date}
                    setOptionTicker={setOptionTicker}
                    setOptionTickerLink={setOptionTickerLink}
                    setOption_multiplier={setOption_multiplier}
                    setOption_timespan={setOption_timespan}
                    setOption_from={setOption_from}
                    setOption_To={setOption_To}
                />
                <SnapFilters
                    _setSnapShotLink={_setSnapShotLink}
                    _handleClearFormFilters={_handleClearFormFilters}
                    snap_option_type={snap_option_type}
                    setSnapOption_type={setSnapOption_type}
                    snap_option_expire_date={snap_option_expire_date}
                    setSnapOption_expire_date={setOption_expire_date}
                    snap_option_ticker={snap_option_ticker}
                    setSnapOptionTicker={setSnapOptionTicker}
                    snap_option_strike_price={snap_option_strike_price}
                    setSnapOption_strike_price={setSnapOption_strike_price}
                    snap_option_ticker_link={snap_option_ticker_link}
                    setSnapOptionTickerLink={setSnapOptionTickerLink}
                />
                <p className='newAggFiltersForm'>

                    <label >{snapBaseURL}/O:{snap_option_ticker}{snap_option_expire_date}{snap_option_type}{snap_option_strike_price}</label>

                    <br />

                    <button onClick={(snapShotLink, setSnapShot) => { HandleAPIpull({ snapShotLink, setSnapShot }) }}>Pull new SnapShot</button>
                </p>
            </section>
        </>
    )

}