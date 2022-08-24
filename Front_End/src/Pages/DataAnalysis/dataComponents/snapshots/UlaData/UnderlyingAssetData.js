import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleGetUnderlyingAsset, HandleUnderlyingAssetSubmit, HandleUnderlyingAssetEdit, HandleUnderlyingAssetDelete } from '../../../analysisControllers/ULassetController';
import ULASelectForm from '../../../pageComponents/ULADataform/ULASelectForm';
import HoldULADataDisplay from '../../../pageComponents/ULADataform/HoldULADataDisplay';


export default function UlaData({ underlying_asset, setUnderlyingAsset, ULDataArray, setULDataArray }) {
    const navigate = useNavigate()
    const [change_to_break_even, setChangeToBreakEven] = useState(0);
    const [last_updated, setULlastUpdated] = useState('');
    const [price, setPrice] = useState(0);
    const [ticker, setULTicker] = useState('');
    const [timeframe, setULTimeFrame] = useState('');

    const [hold_1, setHold1] = useState({});
    const [hold_2, setHold2] = useState({});
    const [hold_3, setHold3] = useState({});

    useEffect(() => {
        setChangeToBreakEven(underlying_asset.change_to_break_even);
        setULlastUpdated(underlying_asset.last_updated);
        setPrice(underlying_asset.price);
        setULTicker(underlying_asset.ticker);
        setULTimeFrame(underlying_asset.timeframe);
        console.log(`${change_to_break_even}\n${last_updated}\n${price}\n${ticker}\n${timeframe}`);
    }, [underlying_asset])



    const _handleGetUnderlyingAsset = async (e) => {
        e.preventDefault();
        await HandleGetUnderlyingAsset({ setUnderlyingAsset })
        navigate('/');
    }
    const _handleULAHold = async (e) => {
        e.preventDefault();
        await HandleUnderlyingAssetSubmit({ underlying_asset, setUnderlyingAsset, ULDataArray, setULDataArray, change_to_break_even, setChangeToBreakEven, last_updated, setULlastUpdated, price, setPrice, ticker, setULTicker, timeframe, setULTimeFrame })
        navigate('/');
    }

    return (
        <article className='ULADataGrid'>
            <section>
                <ULASelectForm
                    title={"ULA Data"}
                    change_to_break_even={change_to_break_even}
                    last_updated={last_updated}
                    price={price}
                    ticker={ticker}
                    timeframe={timeframe}
                />
                <button type='submit' onClick={_handleULAHold}>Compare Data</button>
            </section>
            <HoldULADataDisplay
                title={"Hold 1"}
                change_to_break_even={change_to_break_even}
                last_updated={last_updated}
                price={price}
                ticker={ticker}
                timeframe={timeframe}
            />
            <HoldULADataDisplay
                title={"Hold 2"}
                change_to_break_even={change_to_break_even}
                last_updated={last_updated}
                price={price}
                ticker={ticker}
                timeframe={timeframe}
            />
            <HoldULADataDisplay
                title={"Hold 3"}
                change_to_break_even={change_to_break_even}
                last_updated={last_updated}
                price={price}
                ticker={ticker}
                timeframe={timeframe}
            />

        </article>
    )
}