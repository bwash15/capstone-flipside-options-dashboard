/** Shortens Length of ULAProvider to useULAData and
*   pulls in global states from the ULAProvider **/

import { useContext } from "react";
import { ULAContext } from "../../analysisContext/underlyingAssetContext/UnderlyingAssetContext";

const useULAData = () => {
    return useContext(ULAContext);
}
export { useULAData };