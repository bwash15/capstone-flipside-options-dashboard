import { Link } from 'react-router-dom';
import AnalysisForm from './pageComponents/AnalysisForm';
import AttributeForm from './pageComponents/AttributeForm';

const AnalysisNav = ({ popoverOpen, setPopoverOpen, reqType, setReqType, }) => {

    return (
        <nav className='Nav'>
            <ul>
                <li><Link to="/analytics">Home</Link></li>
                <li><Link to="/analytics/post">New Note</Link></li>
                <li><Link to="/analytics/snapShots">SnapShots</Link></li>
                <li><Link to="/analytics/analysislist">Data List</Link></li>
                <li><Link to="/analytics/analysistable">Data Table</Link></li>
                <li><Link to="/analytics/appclock">App Clock</Link></li>
            </ul><br />
            <AnalysisForm
                reqType={reqType}
                setReqType={setReqType}
            />
            <AttributeForm
                reqType={reqType}
                setReqType={setReqType}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
            />
        </nav>
    )
}

export default AnalysisNav