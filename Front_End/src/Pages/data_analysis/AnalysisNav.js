import { Link } from 'react-router-dom';
import AnalysisForm from './pageComponents/AnalysisForm';

const AnalysisNav = ({ reqType, setReqType }) => {
    return (
        <nav className='Nav'>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">New Note</Link></li>
                <li><Link to="snapShots">SnapShots</Link></li>
                <li><Link to="analysislist">Data List</Link></li>
                <li><Link to="analysistable">Data Table</Link></li>
                <li><Link to="appclock">App Clock</Link></li>
            </ul>
            <br />
            <AnalysisForm
                reqType={reqType}
                setReqType={setReqType}
            />
        </nav>
    )
}

export default AnalysisNav