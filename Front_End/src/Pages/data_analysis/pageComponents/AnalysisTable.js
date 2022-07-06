import AnalysisTableRow from "./AnalysisTableRow"

const AnalysisTable = ({ items, reqType, setReqType }) => {
    return (
        <div className='table-container'>
            <table>
                <tbody>
                    {items.map(item => (
                        <AnalysisTableRow
                            key={item.id}
                            item={item}
                            reqType={reqType}
                            setReqType={setReqType}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AnalysisTable