import React, { Button, Checkbox, Form, useEffect } from 'react';
import dayApi from '../../api/analysis_axios'
import { useDayData } from '../../analysisHooks/useAnalysisProviders/useDayProvider';
import { HandleGetDays } from "../../analysisControllers/dayController";


const DayData = () => {
    const { day, setDay, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, lastUpdated, setLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap } = useDayData;
    console.log(`${change}\n${changePercent}\n${close}\n${high}\n${lastUpdated}\n${low}\n${open}\n${previousClose}\n${volume}\n${vwap}`);


    const SendDayDataToDB = () => {
        dayApi.post('day',
            change, changePercent, close, high, lastUpdated, low, open, previousClose, volume, vwap
        )
    }

    return (
        <div>
            <Form>
                <Button type='submit' onClick={HandleGetDays}>Get Saved Day Data</Button>
                <Form.Field>
                    <label>Day Change</label>
                    <input name="change" placeholder='Day Change' onChange={(e) => { setChange(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Change Percent</label>
                    <input name="change_percent" placeholder='Day Change Percent' onChange={(e) => { setChangePercent(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Close</label>
                    <input name="close" placeholder='Day Close' onChange={(e) => { setClose(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day High</label>
                    <input name="high" placeholder='Day High' onChange={(e) => { setHigh(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Last Updated</label>
                    <input name="last_updated" placeholder='Day Last Updated' onChange={(e) => { setLastUpdated(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Low</label>
                    <input name="low" placeholder='Day Low' onChange={(e) => { setLow(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Open </label>
                    <input name="open" placeholder='Day Open' onChange={(e) => { setOpen(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Previous Close</label>
                    <input name="previous_close" placeholder='Day Previous Close' onChange={(e) => { setPreviousClose(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Volume</label>
                    <input name="volume" placeholder='Day Volume' onChange={(e) => { setVolume(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Day Vwap</label>
                    <input name="vwap" placeholder='Day Vwap' onChange={(e) => { setVwap(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Check to confirm form is Complete' />
                </Form.Field>
                <Button type='submit' onClick={SendDayDataToDB}>Submit</Button>
            </Form>
        </div>
    )
}

export { DayData }