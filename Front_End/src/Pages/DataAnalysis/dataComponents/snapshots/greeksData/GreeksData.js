import React, { useState, useEffect } from 'react';
import GreeksSelectForm from '../../../pageComponents/greeksDataForm/GreeksSelectForm';
import { HandleGreeksSubmit } from '../../../analysisControllers/greeksController';


export default function GreeksData({ greeks, setGreeks, greeksArray, setGreeksArray }) {

    const [title, setTitle] = useState("")
    const [delta, setDelta] = useState([]);
    const [gamma, setGamma] = useState([]);
    const [theta, setTheta] = useState([]);
    const [vega, setVega] = useState([]);


    useEffect(() => {
        setDelta(greeks.delta);
        setGamma(greeks.gamma);
        setTheta(greeks.theta);
        setVega(greeks.vega);
        console.log(`${delta}\n${gamma}\n${theta}\n${vega}`);
    }, [greeks])

    const _handleGreeksHold = async (e) => {
        e.preventDefault();
        await HandleGreeksSubmit({ greeks, setGreeks, greeksArray, setGreeksArray, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega })

    }

    return (
        <article className='greeksDataGrid'>
            <section>
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
                <button type='submit' onClick={_handleGreeksHold}>Compare Data</button>
            </section>
            <GreeksSelectForm
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
            <GreeksSelectForm
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
            <GreeksSelectForm
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