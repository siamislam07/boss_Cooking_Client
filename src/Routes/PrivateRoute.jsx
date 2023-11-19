
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <p className="progress w-56"></p>
    }

    if (user) {
        return children
    }
    return <Navigate state={{from:location}} replace to='/login'></Navigate>
    
};

export default PrivateRoute;