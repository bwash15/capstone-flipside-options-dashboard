import React, { useState, useEffect } from 'react';
import DaySelectForm from '../../../pageComponents/dayDataForm/DaySelectForm';
import { HandleDaySubmit } from '../../../analysisControllers/dayController';
import axios from 'axios';

export default function DayData({ day, setDay, dayDataArray, setDayDataArray }) {

    const [change, setChange] = useState(0);
    const [change_percent, setChangePercent] = useState(0);
    const [close, setClose] = useState(0);
    const [high, setHigh] = useState(0);
    const [last_updated, setLast_updated] = useState('');
    const [low, setLow] = useState(0);
    const [open, setOpen] = useState(0);
    const [previous_close, setPreviousClose] = useState(0);
    const [volume, setVolume] = useState(0);
    const [vwap, setVwap] = useState(0);

    useEffect(() => {
        setChange(day.change);
        setChangePercent(day.change_percent);
        setClose(day.close);
        setHigh(day.high);
        setLast_updated(day.last_updated);
        setLow(day.low);
        setOpen(day.open);
        setPreviousClose(day.previous_close);
        setVolume(day.volume);
        setVwap(day.vwap);
        console.log(`${change}\n${change_percent}\n${close}\n${high}\n${last_updated}\n${low}\n${open}\n${previous_close}\n${volume}\n${vwap}`);
    }, [day])

    const _handleDayHold = async (e) => {
        e.preventDefault();
        await HandleDaySubmit({ dayDataArray, setDayDataArray, setDay, change, setChange, change_percent, setChangePercent, close, setClose, high, setHigh, last_updated, setLast_updated, low, setLow, open, setOpen, previous_close, setPreviousClose, volume, setVolume, vwap, setVwap })

    }

    // const _handleGetDays = async (e) => {
    //     e.preventDefault();
    //     await HandleGetDays({ setDay })
    //     // navigate('/');
    // }

    // const _handleDayDelete = async (e, id) => {
    //     e.preventDefault();
    //     await HandleDayDelete(id)
    //     navigate('/');
    // }


    return (
        <article className='dayDataGrid'>
            <section>
                <DaySelectForm
                    title={"Day"}
                    _handleDayHold={_handleDayHold}
                    change={change}
                    setChange={setChange}
                    change_percent={change_percent}
                    setChangePercent={setChangePercent}
                    close={close}
                    setClose={setClose}
                    high={high}
                    setHigh={high}
                    last_updated={last_updated}
                    setLast_updated={setLast_updated}
                    low={low}
                    setLow={setLow}
                    open={open}
                    setOpen={setOpen}
                    previous_close={previous_close}
                    setPreviousClose={setPreviousClose}
                    volume={volume}
                    setVolume={setVolume}
                    vwap={vwap}
                    setVwap={setVwap}
                />
                <button type='submit' onClick={_handleDayHold}>Compare Data</button>
            </section>
            <DaySelectForm
                title={"Hold 1"}
                _handleDayHold={_handleDayHold}
                change={change}
                setChange={setChange}
                change_percent={change_percent}
                setChangePercent={setChangePercent}
                close={close}
                setClose={setClose}
                high={high}
                setHigh={high}
                last_updated={last_updated}
                setLast_updated={setLast_updated}
                low={low}
                setLow={setLow}
                open={open}
                setOpen={setOpen}
                previous_close={previous_close}
                setPreviousClose={setPreviousClose}
                volume={volume}
                setVolume={setVolume}
                vwap={vwap}
                setVwap={setVwap}
            />
            <DaySelectForm
                title={"Hold 2"}
                _handleDayHold={_handleDayHold}
                change={change}
                setChange={setChange}
                change_percent={change_percent}
                setChangePercent={setChangePercent}
                close={close}
                setClose={setClose}
                high={high}
                setHigh={high}
                last_updated={last_updated}
                setLast_updated={setLast_updated}
                low={low}
                setLow={setLow}
                open={open}
                setOpen={setOpen}
                previous_close={previous_close}
                setPreviousClose={setPreviousClose}
                volume={volume}
                setVolume={setVolume}
                vwap={vwap}
                setVwap={setVwap}
            />
            <DaySelectForm
                title={"Hold 3"}
                _handleDayHold={_handleDayHold}
                change={change}
                setChange={setChange}
                change_percent={change_percent}
                setChangePercent={setChangePercent}
                close={close}
                setClose={setClose}
                high={high}
                setHigh={high}
                last_updated={last_updated}
                setLast_updated={setLast_updated}
                low={low}
                setLow={setLow}
                open={open}
                setOpen={setOpen}
                previous_close={previous_close}
                setPreviousClose={setPreviousClose}
                volume={volume}
                setVolume={setVolume}
                vwap={vwap}
                setVwap={setVwap}
            />

        </article>
    )
}

