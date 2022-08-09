import { useState } from 'react';
import AnalysisHeader from './AnalysisHeader';
import AnalysisFooter from './AnalysisFooter';
import AnalysisNav from './AnalysisNav';

import { Outlet } from 'react-router-dom';

const AnalysisLayout = ({ popoverOpen, setPopoverOpen, search, setSearch, reqType, setReqType }) => {
    const [title, setTitle] = useState("Analyze your data");


    return (
        <div className='adApp'>
            <AnalysisHeader
                title={title}
                search={search}
                setSearch={setSearch}
            />
            <AnalysisNav
                reqType={reqType}
                setReqType={setReqType}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
            />
            <Outlet />
            <AnalysisFooter />
        </div>
    )
}

export default AnalysisLayout