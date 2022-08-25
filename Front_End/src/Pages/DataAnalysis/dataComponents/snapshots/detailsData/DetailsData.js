import React, { useState, useEffect } from 'react';
import DetailsSelectForm from '../../../pageComponents/detailsDataForm/DetailsSelectForm';
import HoldDetailsDataDisplay from '../../../pageComponents/detailsDataForm/HoldDetailsDataDisplay';
import { HandleDetailsSubmit, HandleDetailsEdit, HandleDetailsDelete, HandleGetDetails } from "../../../analysisControllers/detailsController";

export default function DetailsData({ snapShot, details, setDetails, detailsDataArray, setDetailsDataArray }) {

    const [contract_type, setContractType] = useState('');
    const [exercise_style, setExerciseStyle] = useState('');
    const [expiration_date, setExpirationDate] = useState('');
    const [shares_per_contract, setSharesPerContract] = useState(0.0);
    const [strike_price, setStrikePrice] = useState(0.0);
    const [ticker, setDetailsTicker] = useState('');

    const [hold_1, setHold1] = useState({});
    const [hold_2, setHold2] = useState({});
    const [hold_3, setHold3] = useState({});

    useEffect(() => {
        setContractType(snapShot.results.details.contract_type);
        setExerciseStyle(snapShot.results.details.exercise_style);
        setExpirationDate(snapShot.results.details.expiration_date);
        setSharesPerContract(snapShot.results.details.shares_per_contract);
        setStrikePrice(snapShot.results.details.strike_rice);
        setDetailsTicker(snapShot.results.details.ticker);
        console.log(`${contract_type}\n${exercise_style}\n${expiration_date}\n${shares_per_contract}\n${strike_price}\n${ticker}`);
    }, [snapShot])

    const _handleDetailsHold = async (e) => {
        e.preventDefault();
        await HandleDetailsSubmit({ details, setDetails, detailsDataArray, setDetailsDataArray, contract_type, exercise_style, expiration_date, shares_per_contract, strike_price, ticker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker })

    }

    return (
        <article className='detailsDataGrid'>
            <section>
                {details.length ? (
                    <DetailsSelectForm
                        title={"Details"}
                        _handleDetailsHold={_handleDetailsHold}
                        contract_type={contract_type}
                        setContractType={setContractType}
                        exercise_style={exercise_style}
                        setExerciseStyle={setExerciseStyle}
                        expiration_date={expiration_date}
                        setExpirationDate={setExpirationDate}
                        shares_per_contract={shares_per_contract}
                        setSharesPerContract={setSharesPerContract}
                        strike_price={strike_price}
                        setStrikePrice={setStrikePrice}
                        ticker={ticker}
                        setTicker={setDetailsTicker}
                    />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No Details Data to display
                    </p>
                )}
                <button type='submit' onClick={_handleDetailsHold}>Hold Data</button>
            </section>
            <HoldDetailsDataDisplay
                title={"Hold 1"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
            <HoldDetailsDataDisplay
                title={"Hold 2"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
            <HoldDetailsDataDisplay
                title={"Hold 3"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
        </article>
    )
}