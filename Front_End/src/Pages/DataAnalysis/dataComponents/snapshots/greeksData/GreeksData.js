import React, { useState, useEffect } from 'react';
import GreeksSelectForm from '../../../pageComponents/greeksDataForm/GreeksSelectForm';
import HoldGreeksDataDisplay from '../../../pageComponents/greeksDataForm/HoldGreeksDataDisplay';
import { HandleGreeksSubmit } from '../../../analysisControllers/greeksController';


export default function GreeksData({ snapShot, greeks, setGreeks, greeksArray, setGreeksArray }) {

    const [title, setTitle] = useState("")
    const [delta, setDelta] = useState([]);
    const [gamma, setGamma] = useState([]);
    const [theta, setTheta] = useState([]);
    const [vega, setVega] = useState([]);

    const [hold_1, setHold1] = useState({});
    const [hold_2, setHold2] = useState({});
    const [hold_3, setHold3] = useState({});


    useEffect(() => {
        setDelta(snapShot.results.greeks.delta);
        setGamma(snapShot.results.greeks.gamma);
        setTheta(snapShot.results.greeks.theta);
        setVega(snapShot.results.greeks.vega);
        console.log(`${delta}\n${gamma}\n${theta}\n${vega}`);
    }, [snapShot])

    const _handleGreeksHold = async (e) => {
        e.preventDefault();
        await HandleGreeksSubmit({ greeks, setGreeks, greeksArray, setGreeksArray, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega })

    }

    return (
        <article className='greeksDataGrid'>
            <section>
                {greeks.length ? (
                    <GreeksSelectForm
                        title={"Greeks"}
                        _handleGreeksHold={_handleGreeksHold}
                        delta={delta}
                        setDelta={setDelta}
                        gamma={gamma}
                        setGamma={setGamma}
                        theta={theta}
                        setTheta={setTheta}
                        vega={vega}
                        setVega={setVega}
                    />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No Day Data to display
                    </p>
                )}
                <button type='submit' onClick={_handleGreeksHold}>Hold Data</button>
            </section>
            <HoldGreeksDataDisplay
                title={"Hold 1"}
                _handleGreeksHold={_handleGreeksHold}
                delta={delta}
                setDelta={setDelta}
                gamma={gamma}
                setGamma={setGamma}
                theta={theta}
                setTheta={setTheta}
                vega={vega}
                setVega={setVega}
            />
            <HoldGreeksDataDisplay
                title={"Hold 2"}
                _handleGreeksHold={_handleGreeksHold}
                delta={delta}
                setDelta={setDelta}
                gamma={gamma}
                setGamma={setGamma}
                theta={theta}
                setTheta={setTheta}
                vega={vega}
                setVega={setVega}
            />
            <HoldGreeksDataDisplay
                title={"Hold 3"}
                _handleGreeksHold={_handleGreeksHold}
                delta={delta}
                setDelta={setDelta}
                gamma={gamma}
                setGamma={setGamma}
                theta={theta}
                setTheta={setTheta}
                vega={vega}
                setVega={setVega}
            />

        </article>
    )
} 