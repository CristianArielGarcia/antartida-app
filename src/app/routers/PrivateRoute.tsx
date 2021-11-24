import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any): JSX.Element => {
    const user = {
        isLoggedIn: true,
        nombre: "Cristian",
    };

    return !user.isLoggedIn ? <Navigate to="/auth" /> : children;
};
