/** Shortens Length of LastQuoteProvider to useLastQuoteData and
*   pulls in global states from the LastQuoteProvider **/

import { useContext } from "react";
import { LastQuoteContext } from ".../../analysisContext/lastQuoteContext/LastQuoteProvider";

const useLastQuoteData = () => {
    return useContext(LastQuoteContext);
}
export { useLastQuoteData };