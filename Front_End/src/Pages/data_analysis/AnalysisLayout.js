import { useState } from 'react';
import AnalysisHeader from './AnalysisHeader';
import AnalysisFooter from './AnalysisFooter';
import AnalysisNav from './AnalysisNav';

import { Outlet } from 'react-router-dom';

const AnalysisLayout = ({ search, setSearch, reqType, setReqType }) => {
    const [title, setTitle] = useState("Analyze your data");


    return (
        <div className='AdApp'>
            <AnalysisHeader
                title={title}
                search={search}
                setSearch={setSearch}
            />
            <AnalysisNav
                reqType={reqType}
                setReqType={setReqType}
            />
            <Outlet />
            <AnalysisFooter />
        </div>
    )
}

export default AnalysisLayout