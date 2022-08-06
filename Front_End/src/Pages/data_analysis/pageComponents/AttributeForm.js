import { useRef } from 'react';
import { Button, Popover, PopoverBody } from "reactstrap";

const AttributeForm = ({ _handleFilterEdit,
    snapShotBaseUrl, setSnapShotLink, option_ticker, option_type, option_expire_date, option_strike_price, option_multiplier, option_timespan, option_ticker_link, option_from, option_to, setOptionTicker, setOptionTickerLink, setOption_type, setOption_expire_date, setOption_strike_price, setOption_multiplier, setOption_timespan, setOption_from, setOption_To, handleClearFormFilters, popoverOpen, setPopoverOpen }) => {

    const ref = useRef(null);

    return (

        <header ref={ref}  >
            <Button id="Popover" color="primary">
                Attribute Filters
            </Button> <br></br>
            <Popover
                placement="right"
                isOpen={popoverOpen}
                target="Popover"
                toggle={() => { setPopoverOpen(!popoverOpen) }}
                container={ref}
            >
                <PopoverBody>
                    <p className='attributeGridForForm'>
                        <label >Base URL: </label><br />
                        <label >{snapShotBaseUrl}</label>
                        <label>Current Ticker Link: </label><br />
                        <label >{option_ticker_link}</label>
                        <label>Update Ticker Link To: </label><br />
                        <label >O:{option_ticker}{option_expire_date}{option_type}{option_strike_price}</label>
                    </p>
                    <form className='newPostForm' >
                        <button
                            className='apiPullbutton'
                            type="submit"
                            onClick={(e) => { _handleFilterEdit(e) }}>Update Aggregate Filters</button>
                        <br />
                        <button className='apiPullbutton' onClick={handleClearFormFilters}>Clear Filters</button>
                        <label htmlFor="option_ticker_link">Ticker Link:
                            <input
                                type="text"
                                id="option_ticker_link"
                                name="option_ticker_link"
                                value={`O:${option_ticker}/${option_expire_date}/${option_type}/${option_strike_price}`}
                                onChange={(e) => { setOptionTickerLink(e.target.value) }}
                            />
                        </label>
                        <label htmlFor="option_ticker">Ticker:
                            <label htmlFor='option_ticker'>{option_ticker}</label>
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
                            <label htmlFor='option_type'>{option_type}</label>
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
                            <label htmlFor='option_expire_date'>{option_expire_date}</label>
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
                            <label htmlFor='option_strike_price'>{option_strike_price}</label>
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
                            <label htmlFor='option_multiplier'>{option_multiplier}</label>
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
                            <label htmlFor='option_timespan'>{option_timespan}</label>
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
                            <label htmlFor='option_from'>{option_from}</label>
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
                            <label htmlFor='option_to'>{option_to}</label>
                            <input
                                type="text"
                                id="option_to"
                                name='option_to'
                                value={option_to}
                                onChange={(e) => setOption_To(e.target.value)}
                            />
                        </label>
                        <br />
                    </form>
                </PopoverBody>
            </Popover>
        </header>
    )
}

export default AttributeForm