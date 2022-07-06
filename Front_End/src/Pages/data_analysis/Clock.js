import { useState, useEffect, useRef } from 'react';


const Clock = ({ clock, setClock, setSeconds, seconds, lastClockUpdate, setLastClockUpdate, clockId, totalAppRunTime }) => {

    useEffect(() => {
        AppClock()
    }, [])

    const AppClock = () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = CheckTime(m);
        s = CheckTime(s);
        let time = h + ":" + m + ":" + s;
        setClock(time);
    }

    const CheckTime = (i) => {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    const recordLastUpdateTime = (e) => {
        e.preventDefault();
        setLastClockUpdate(clockId.current);
        sessionStorage.setItem('timeLastUpdated', JSON.stringify(lastClockUpdate))
    }

    const handleLastClockUpdate = (e) => {
        setLastClockUpdate(e.target.value);
        totalAppRunTime.current++
    }

    const startClock = () => {
        clockId.current = setInterval(() => {
            totalAppRunTime.current++;
            setSeconds(prev => prev + 1);
            setLastClockUpdate(clock)
            AppClock();
        }, 1000)
    }

    const stopClock = () => {
        clearInterval(clockId.current);
        clockId.current = 0;

    }

    const resetClock = () => {
        stopClock();
        if (seconds) {
            totalAppRunTime.current++;
            setSeconds(0);
            clockId.current = 0;
        }
    }

    return (
        <section>
            <p>App Clock: {clock}</p>
            <p>Last Clock Update: {lastClockUpdate}</p>
            <p>Total App Run Time: {totalAppRunTime.current}</p>
            <p>Current App Run Time(seconds): {seconds}</p>
            <p>Number of Clock Updates: {clockId.current}</p>
            <br />
            <section>
                <button onClick={startClock}>Start</button>
                <button onClick={stopClock}>Stop</button>
                <button onClick={resetClock}>Reset</button>
            </section>
            <br /><br />
        </section>
    )
}

export default Clock