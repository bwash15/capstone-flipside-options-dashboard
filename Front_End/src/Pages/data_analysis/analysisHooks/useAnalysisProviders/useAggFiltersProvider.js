/** Shortens Length of AggFiltersProvider to useAggFiltersData and
*   pulls in global states from the AggFiltersProvider **/

import { useContext } from "react";
import { AggFiltersContext } from "../../analysisContext/aggFiltersContext/AggFiltersProvider";

const useAggFiltersData = () => {
    return useContext(AggFiltersContext);
}
export { useAggFiltersData };