import AnalysisCardData from "./AnalysisCardData";
import { Card, Button } from "react-bootstrap"
import FilterButton from "../buttonComponents/FilterButton";

const AnalysisTableRow = ({ item, reqType, setReqType }) => {
    return (
        <tr>
            <Card>
                <Card.Header>{item.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Properties</Card.Title>
                    <Card.Text>
                        {Object.entries(item).map(([key, value]) => {
                            return (
                                <AnalysisCardData key={key} cardData={JSON.stringify(value)} cardKey={JSON.stringify(key)} />
                            )
                        })}
                    </Card.Text>
                    <FilterButton
                        buttonText={"Filtered Object"}
                        reqType={reqType}
                        setReqType={setReqType}
                    />
                </Card.Body>
            </Card>
        </tr>
    )
}

export default AnalysisTableRow