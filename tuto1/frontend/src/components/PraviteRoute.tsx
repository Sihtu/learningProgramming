import { Navigate, Outlet } from "react-router-dom"
import Register from "./register"

const PraviteRoute = ( ) => {
    const key = localStorage.getItem("key")
    return key? <Outlet/> : <Navigate to="/login"/>
}

export default PraviteRoute;