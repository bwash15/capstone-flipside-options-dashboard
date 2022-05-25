import { useContext } from "react";
import UserContext from "../context/customer copy";

const useUser = () => {
    return useContext(UserContext);
}
export default useUser;