import React, { useState, useEffect } from 'react';
import DaySelectForm from '../../../pageComponents/dayDataForm/DaySelectForm';
import HoldDayDataDisplay from '../../../pageComponents/dayDataForm/HoldDayDataDisplay';
import { HandleDaySubmit } from '../../../analysisControllers/dayController';
import axios from 'axios';

export default function DayData({ snapShot, day, setDay, dayDataArray, setDayDataArray }) {

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



    const [hold_1, setHold1] = useState({});
    const [hold_2, setHold2] = useState({});
    const [hold_3, setHold3] = useState({});


    useEffect(() => {
        setChange(snapShot.results.day.change);
        setChangePercent(snapShot.results.day.change_percent);
        setClose(snapShot.results.day.close);
        setHigh(snapShot.results.day.high);
        setLast_updated(snapShot.results.day.last_updated);
        setLow(snapShot.results.day.low);
        setOpen(snapShot.results.day.open);
        setPreviousClose(snapShot.results.day.previous_close);
        setVolume(snapShot.results.day.volume);
        setVwap(snapShot.results.day.vwap);

        console.log(`${change}\n${change_percent}\n${close}\n${high}\n${last_updated}\n${low}\n${open}\n${previous_close}\n${volume}\n${vwap}`);
    }, [snapShot])

    const _handleDayHold = async (e) => {
        e.preventDefault();
        const allDay = [...dayDataArray, day];
        setDayDataArray(allDay);

    }
    const _handleDaySaveToDB = async (e) => {
        e.preventDefault();
        await HandleDaySubmit({ dayDataArray, setDayDataArray, change, setChange, change_percent, setChangePercent, close, setClose, high, setHigh, last_updated, setLast_updated, low, setLow, open, setOpen, previous_close, setPreviousClose, volume, setVolume, vwap, setVwap })

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
            <HoldDayDataDisplay
                title={"Hold 1"}
                dayDataArray={dayDataArray}
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
            <HoldDayDataDisplay
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
            <HoldDayDataDisplay
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



