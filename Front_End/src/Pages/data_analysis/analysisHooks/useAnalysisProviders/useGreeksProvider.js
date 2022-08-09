/** Shortens Length of GreeksProvider to useGreeksData and
*   pulls in global states from the GreeksProvider **/

import { useContext } from "react";
import GreeksContext from "../../analysisContext/greeksContext/GreeksProvider";

const useGreeksData = () => {
    return useContext(GreeksContext);
}
export default useGreeksData;