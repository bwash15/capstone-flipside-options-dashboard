import { useState, useRef } from 'react'
import { Button, Popover, PopoverBody } from "reactstrap"
import OptionAttributes from '../data_analysis/OptionAttributes';

const AdHeader = ({
    reqType, setReqType, option_ticker, option_type, option_expire_date, option_strike_price, option_multiplier, option_timespan, option_from, option_to, setOptionTicker, setOption_type, setOption_expire_date, setOption_strike_price, setOption_multiplier, setOption_timespan, setOption_from, setOption_To, handleAttributeSubmit }) => {

    // Popover open state
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);


    return (
        <header ref={ref}>
            <Button id="Popover" color="primary">
                Filters
            </Button> <br></br>
            <Popover
                placement="left"
                isOpen={popoverOpen}
                target="Popover"
                toggle={() => { setPopoverOpen(!popoverOpen) }}
                container={ref}
            >
                <PopoverBody>
                    <OptionAttributes
                        reqType={reqType}
                        setReqType={setReqType}
                        option_ticker={option_ticker}
                        option_type={option_type}
                        option_expire_date={option_expire_date}
                        option_strike_price={option_strike_price}
                        option_multiplier={option_multiplier}
                        option_timespan={option_timespan}
                        option_from={option_from}
                        option_to={option_to}
                        setOptionTicker={setOptionTicker}
                        setOption_type={setOption_type}
                        setOption_expire_date={setOption_expire_date}
                        setOption_strike_price={setOption_strike_price}
                        setOption_multiplier={setOption_multiplier}
                        setOption_timespan={setOption_timespan}
                        setOption_from={setOption_from}
                        setOption_To={setOption_To}
                        handleAttributeSubmit={handleAttributeSubmit}
                    />
                </PopoverBody>
            </Popover>
        </header>
    )
}

export default AdHeader