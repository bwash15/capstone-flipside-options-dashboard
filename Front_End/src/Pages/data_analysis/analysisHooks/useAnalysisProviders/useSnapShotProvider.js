/** Shortens Length of SnapShotProvider to useSnapShotData and
*   pulls in global states from the SnapShotProvider **/

import { useContext } from "react";
import { SnapShotContext } from ".../../analysisContext/SnapShotContext/SnapShotProvider";

const useSnapShotData = () => {
    return useContext(SnapShotContext);
}
export { useSnapShotData };