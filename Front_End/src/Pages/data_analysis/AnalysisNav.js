import { Link } from 'react-router-dom';
import AnalysisForm from './pageComponents/AnalysisForm';
import AttributeForm from './pageComponents/AttributeForm';

const AnalysisNav = ({ _handleFilterEdit, popoverOpen, setPopoverOpen, snapShotBaseUrl, setSnapShotLink, reqType, setReqType, option_ticker, option_type, option_expire_date, option_strike_price, option_ticker_link, option_multiplier, option_timespan, option_from, option_to, setOptionTicker, setOption_type, setOption_expire_date, setOption_strike_price, setOptionTickerLink, setOption_multiplier, setOption_timespan, setOption_from, setOption_To, handleFilterSubmit, handleClearFormFilters }) => {


    return (
        <nav className='Nav'>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">New Note</Link></li>
                <li><Link to="/snapShots">SnapShots</Link></li>
                <li><Link to="/analysislist">Data List</Link></li>
                <li><Link to="/analysistable">Data Table</Link></li>
                <li><Link to="/appclock">App Clock</Link></li>
            </ul>            <br />
            <AnalysisForm
                reqType={reqType}
                setReqType={setReqType}
            />
            <AttributeForm
                reqType={reqType}
                setReqType={setReqType}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                handleFilterSubmit={handleFilterSubmit}
                handleClearFormFilters={handleClearFormFilters}
                _handleFilterEdit={_handleFilterEdit}
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
        </nav>
    )
}

export default AnalysisNav