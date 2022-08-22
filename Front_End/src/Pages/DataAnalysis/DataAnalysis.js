import './App.css';
import React, { useEffect, useState } from 'react';
import DayData from './dataComponents/snapshots/dayData/DayData';
import DetailsData from './dataComponents/snapshots/detailsData/DetailsData';
import GreeksData from './dataComponents/snapshots/greeksData/GreeksData';
import LastQuoteData from './dataComponents/snapshots/lastQuoteData/LastQuoteData';
import ULAData from './dataComponents/snapshots/UlaData/UnderlyingAssetData';
import SnapShotData from './dataComponents/snapshots/snapShotData/SnapShotData';
import { pullSetSnapShot } from './utils/loadData'
import SnapShotDisplay from './pageComponents/api_pull_table/snapShotDisplay';
import FiltersSelect from './dataComponents/filters/aggFiltersSelect';


function DataAnalysis() {

  const [reqType, setReqType] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [optionTickers, setOptionTickers] = useState([]);

  const [userReqFilters, setUserReqFilters] = useState([]);

  const [snapShotLink, setSnapShotLink] = useState('https://api.polygon.io/v3/snapshot/options/AAPL/O:AAPL230616C00150000?apiKey=MNExhabeDDgHYLqKlxDoT79JUdvT_OaI');
  const [aggregates_link, setAggregatesLink] = useState('');
  const [ticker_link, setTickerLink] = useState('');
  const [news_link, setNewsLink] = useState('');


  const [url_links, setURLlinks] = useState([
    snapShotLink,
    aggregates_link,
    ticker_link,
    news_link
  ])


  const [aggFilters, setAggFilters] = useState({
    option_type: 'C',
    option_expire_date: '20220915',
    option_ticker: 'TSLA',
    option_strike_price: 15.0,
    option_ticker_link: ``,
    option_multiplier: 1,
    option_timespan: 'day',
    option_from: '2022-07-20',
    option_to: '2022-07-23',
  });

  const [snapFilters, setSnapFilters] = useState([{
    option_type: '',
    option_expire_date: '',
    option_ticker: '',
    option_strike_price: '',
    option_ticker_link: ``,
  }]);

  // Array to work with previously shown data and show differences between time periods
  const [snapShotArray, setSnapShotArray] = useState([]);
  const [dayDataArray, setDayDataArray] = useState([]);
  const [detailsDataArray, setDetailsDataArray] = useState([]);
  const [greeksArray, setGreeksArray] = useState([]);
  const [lastQuoteArray, setLastQuoteArray] = useState([]);
  const [ULDataArray, setULDataArray] = useState([]);

  const [snapShot, setSnapShot] = useState({
    request_id: '09876543211234567890',
    results: {
      break_even_price: 0.0,
      day: {
        change: 0.0,
        change_percent: 0.0,
        close: 0.0,
        high: 0.0,
        last_updated: 'today',
        low: 0.0,
        open: 0.0,
        previous_close: 0.0,
        volume: 0.0,
        vwap: 0.0
      },
      details: {
        contract_type: 'String',
        exercise_style: 'String',
        expiration_date: 0.0,
        shares_per_contract: 0.0,
        strike_rice: 0.0,
        ticker: 'String'
      },
      greeks: {
        delta: 0.0,
        gamma: 0.0,
        theta: 0.0,
        vega: 0.0,

      },
      implied_volatility: 0.0,
      last_quote: {
        ask: 0.0,
        ask_size: 0.0,
        bid: 0.0,
        bid_size: 0.0,
        last_updated: 0.0,
        midPoint: 0.0,
        timeframe: 'String'
      },
      open_interest: 0.0,
      underlying_asset: {
        change_to_break_even: 0.0,
        last_updated: 0.0,
        price: 0.0,
        ticker: 'String',
        timeframe: 'String'
      },
    },
    status: 'OK'
  });

  const [singleProps, setSingleProps] = useState({
    break_even_price: snapShot.results.break_even_price,
    implied_volatility: snapShot.results.implied_volatility,
    open_interest: snapShot.results.open_interest
  });
  const [day, setDay] = useState({
    change: snapShot.results.day.change,
    change_percent: snapShot.results.day.change_percent,
    close: snapShot.results.day.close,
    high: snapShot.results.day.high,
    last_updated: snapShot.results.day.last_updated,
    low: snapShot.results.day.low,
    open: snapShot.results.day.open,
    previous_close: snapShot.results.day.previous_close,
    volume: snapShot.results.day.volume,
    vwap: snapShot.results.day.vwap
  });
  const [details, setDetails] = useState({
    contract_type: snapShot.results.details.contract_type,
    exercise_style: snapShot.results.details.exercise_style,
    expiration_date: snapShot.results.details.expiration_date,
    shares_per_contract: snapShot.results.details.shares_per_contract,
    strike_price: snapShot.results.details.strike_rice,
    ticker: snapShot.results.details.ticker
  });
  const [greeks, setGreeks] = useState({
    delta: snapShot.results.greeks.delta,
    gamma: snapShot.results.greeks.gamma,
    theta: snapShot.results.greeks.theta,
    vega: snapShot.results.greeks.vega
  });
  const [last_quote, setLastQuote] = useState({
    ask: snapShot.results.last_quote.ask,
    ask_size: snapShot.results.last_quote.ask_size,
    bid: snapShot.results.last_quote.bid,
    bid_size: snapShot.results.last_quote.bid_size,
    last_updated: snapShot.results.last_quote.last_updated,
    midpoint: snapShot.results.last_quote.midPoint,
    timeframe: snapShot.results.last_quote.timeframe
  });
  const [underlying_asset, setUnderlyingAsset] = useState({
    change_to_break_even: snapShot.results.underlying_asset.change_to_break_even,
    last_updated: snapShot.results.underlying_asset.last_updated,
    price: snapShot.results.underlying_asset.price,
    ticker: snapShot.results.underlying_asset.ticker,
    timeframe: snapShot.results.underlying_asset.timeframe
  });




  const _pullDataFromAPI = (e) => {
    e.preventDefault();
    pullSetSnapShot(setSnapShot);
  }



  return (
    <>
      <div className="App">
        <header className='header'>
          <FiltersSelect
            aggFilters={aggFilters}
            setAggFilters={setAggFilters}
            url_links={url_links}
            setURLlinks={setURLlinks}
            setAggregatesLink={setAggregatesLink}
            setSnapShotLink={setSnapShotLink}
          />
        </header>
        <section className='snapBody'>
          <SnapShotDisplay
            snapShot={snapShot}
            setSnapShot={setSnapShot}
            snapShotLink={snapShotLink}
            setSnapShotArray={setSnapShotArray}
            day={day}
            setDay={setDay}
            dayDataArray={dayDataArray}
            setDayDataArray={setDayDataArray}
            details={details}
            setDetails={setDetails}
            detailsDataArray={detailsDataArray}
            setDetailsDataArray={setDetailsDataArray}
            greeks={greeks}
            setGreeks={setGreeks}
            greeksArray={greeksArray}
            setGreeksArray={setGreeksArray}
            last_quote={last_quote}
            setLastQuote={setLastQuote}
            lastQuoteArray={lastQuoteArray}
            setLastQuoteArray={setLastQuoteArray}
            underlying_asset={underlying_asset}
            setUnderlyingAsset={setUnderlyingAsset}
            ULDataArray={ULDataArray}
            setULDataArray={setULDataArray}
          />
        </section>
      </div>
    </>
  );
}

export default DataAnalysis;
