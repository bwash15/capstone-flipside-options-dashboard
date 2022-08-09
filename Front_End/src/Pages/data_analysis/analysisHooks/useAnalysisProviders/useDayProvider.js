/** Shortens Length of DayProvider to useDayData and
*   pulls in global states from the DayProvider **/

import { useContext } from "react";
import { DayContext } from "../../analysisContext/dayContext/DayProvider";


const useDayData = () => {
    return useContext(DayContext);
}
export { useDayData };