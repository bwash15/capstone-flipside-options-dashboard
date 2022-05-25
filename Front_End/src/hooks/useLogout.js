/** Can be used anywhere in the app **/

import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            // Reaches out to the back end logout controller
            // Clears the cookie if the logged in session ends
            // so the session does not persist after the user
            // leaves the session - Does NOT store in Session Memory
            const response = await axios('./logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}
export default useLogout;

