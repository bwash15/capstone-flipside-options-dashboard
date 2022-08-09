/** Shortens Length of DetailsProvider to useDetailsData and
*   pulls in global states from the DetailsProvider **/

import { useContext } from "react";
import { DetailsContext } from "../../analysisContext/detailsContext/DetailsProvider";


const useDetailsData = () => {
    return useContext(DetailsContext);
}
export { useDetailsData };