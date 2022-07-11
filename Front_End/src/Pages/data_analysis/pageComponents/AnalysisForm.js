import { useState, useRef } from 'react';

import { Button, Popover, PopoverBody } from "reactstrap";
import FilterButton from '../buttonComponents/FilterButton';

const AnalysisForm = ({ reqType, setReqType }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const ref = useRef(null);
    return (

        <header ref={ref}>

            <Button id="Popover" color="primary">
                Data Filters
            </Button> <br></br>
            <Popover
                placement="left"
                isOpen={popoverOpen}
                target="Popover"
                toggle={() => { setPopoverOpen(!popoverOpen) }}
                container={ref}
            >
                <PopoverBody>

                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <>
                            <FilterButton
                                buttonText="Users"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Posts"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="SnapShots"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Day"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Details"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Greeks"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Last_Quote"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                            <FilterButton
                                buttonText="Underlying_Asset"
                                reqType={reqType}
                                setReqType={setReqType}
                            />
                        </>
                    </form>
                </PopoverBody>
            </Popover>
        </header>





    )
}

export default AnalysisForm