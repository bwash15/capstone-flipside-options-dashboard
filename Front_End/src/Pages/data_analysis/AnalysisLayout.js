import { useState } from 'react';
import AnalysisHeader from './AnalysisHeader';
import AnalysisFooter from './AnalysisFooter';
import AnalysisNav from './AnalysisNav';

import { Outlet } from 'react-router-dom';

const AnalysisLayout = ({ popoverOpen, setPopoverOpen, snapShotBaseUrl, setSnapShotLink, search, setSearch, reqType, setReqType, option_ticker, option_type, option_expire_date, option_strike_price, option_ticker_link, option_multiplier, option_timespan, option_from, option_to, setOptionTicker, setOption_type, setOption_expire_date, setOption_strike_price, setOptionTickerLink, setOption_multiplier, setOption_timespan, setOption_from, setOption_To, handleClearFormFilters, handleFilterSubmit }) => {
    const [title, setTitle] = useState("Analyze your data");


    return (
        <div className='adApp'>
            <AnalysisHeader
                title={title}
                search={search}
                setSearch={setSearch}
            />
            <AnalysisNav
                reqType={reqType}
                setReqType={setReqType}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                handleFilterSubmit={handleFilterSubmit}
                handleClearFormFilters={handleClearFormFilters}
                setSnapShotLink={setSnapShotLink}
                snapShotBaseUrl={snapShotBaseUrl}
                option_type={option_type}
                setOption_type={setOption_type}
                option_expire_date={option_expire_date}
                setOption_expire_date={setOption_expire_date}
                option_ticker={option_ticker}
                setOptionTicker={setOptionTicker}
                option_strike_price={option_strike_price}
                setOption_strike_price={setOption_strike_price}
                option_ticker_link={option_ticker_link}
                setOptionTickerLink={setOptionTickerLink}
                option_multiplier={option_multiplier}
                setOption_multiplier={setOption_multiplier}
                option_timespan={option_timespan}
                setOption_timespan={setOption_timespan}
                option_from={option_from}
                setOption_from={setOption_from}
                option_to={option_to}
                setOption_To={setOption_To}

            />
            <Outlet />
            <AnalysisFooter />
        </div>
    )
}

export default AnalysisLayout