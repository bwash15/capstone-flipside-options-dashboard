import { useState, useEffect } from 'react';
import { useInitialAppDataLoad } from '../../utils/loadData';
import { snapShotsApi } from '../../api/analysis_axios';
import DayData from '../../dataComponents/snapshots/dayData/DayData';
import DetailsData from '../../dataComponents/snapshots/detailsData/DetailsData';
import GreeksData from '../../dataComponents/snapshots/greeksData/GreeksData';
import LastQuoteData from '../../dataComponents/snapshots/lastQuoteData/LastQuoteData';
import UlaData from '../../dataComponents/snapshots/UlaData/UnderlyingAssetData';
import SnapShotData from '../../dataComponents/snapshots/snapShotData/SnapShotData';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

const SnapShotDisplay = ({ snapShot, snapShotLink, setSnapShotArray, snapShotArray, setSnapShot, day, setDay, dayDataArray, setDayDataArray, details, setDetails, detailsDataArray, setDetailsDataArray, greeks, setGreeks, greeksArray, setGreeksArray, last_quote, setLastQuote, lastQuoteArray, setLastQuoteArray, underlying_asset, setUnderlyingAsset, ULDataArray, setULDataArray }) => {


    const [resultsKeys, setResultsKeys] = useState(null);

    // useEffect(() => {


    //     //handleAPIpull();




    //     // sessionStorage.setItem("snapShotAPIpull", JSON.stringify(JsonOptionsData));
    //     // sessionStorage.setItem("newSnapShotArray", JSON.stringify(snapShotArray));
    //     // sessionStorage.setItem("SnapShot_results_keys", JSON.stringify(optionResultsKeys));
    //     // sessionStorage.setItem("SnapShot_keys", JSON.stringify(optionKeys));
    //     // sessionStorage.setItem("day", JSON.stringify(JsonOptionsData));
    // }, [snapShotLink]);

    const pullSnapShot = async () => {
        const response = await snapShotsApi.get('')
    }




    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="snapShot">Full SnapShot</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="day">Day</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="details">Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="greeks">Greeks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="last_quote">Last Quote</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="underlying_asset">Underlying Asset</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="snapShot">
                                <SnapShotData
                                    snapShot={snapShot}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="day">
                                <DayData
                                    day={day}
                                    setDay={setDay}
                                    snapShot={snapShot}
                                    dayDataArray={dayDataArray}
                                    setDayDataArray={setDayDataArray}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="details">
                                <DetailsData
                                    snapShot={snapShot}
                                    details={details}
                                    setDetails={setDetails}
                                    detailsDataArray={detailsDataArray}
                                    setDetailsDataArray={setDetailsDataArray}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="greeks">
                                <GreeksData
                                    snapShot={snapShot}
                                    greeks={greeks}
                                    setGreeks={setGreeks}
                                    greeksArray={greeksArray}
                                    setGreeksArray={setGreeksArray}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="last_quote">
                                <LastQuoteData
                                    snapShot={snapShot}
                                    last_quote={last_quote}
                                    setLastQuote={setLastQuote}
                                    lastQuoteArray={lastQuoteArray}
                                    setLastQuoteArray={setLastQuoteArray}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="underlying_asset">
                                <UlaData
                                    snapShot={snapShot}
                                    underlying_asset={underlying_asset}
                                    setUnderlyingAsset={setUnderlyingAsset}
                                    ULDataArray={ULDataArray}
                                    setULDataArray={setULDataArray}
                                />
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default SnapShotDisplay