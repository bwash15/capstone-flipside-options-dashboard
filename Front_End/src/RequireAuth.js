import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // Checks to see IF there is a ROLE => IF there is a role listed
        //   >  Does that role match one in the allowedRoles Array 
        //      passed in from the Back_End
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                // the user is not logged in > sending user to the login page => [state={{ from: location }} replace]
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;



