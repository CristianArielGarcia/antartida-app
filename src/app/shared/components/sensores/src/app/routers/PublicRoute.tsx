import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: any): JSX.Element => {
    // agregarle que cuando se autentifique lo redireccione al main

    const user = {
        logged: true,
        nombre: "Cristian",
    };

    console.log(user)

    return user.logged ? <Navigate to="/main" /> : children;
}