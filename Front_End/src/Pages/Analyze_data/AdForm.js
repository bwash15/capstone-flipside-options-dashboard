import React from 'react'
import SnapShotObjButton from '../components/SnapShotObjButton'


const AdForm = ({ reqType, setReqType }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <SnapShotObjButton
                    buttonText="home"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="snapShot"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="day"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="details"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="greeks"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="last_quote"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="underlying_asset"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <SnapShotObjButton
                    buttonText="posts"
                    reqType={reqType}
                    setReqType={setReqType}
                />
            </div>
        </form>
    )
}

export default AdForm