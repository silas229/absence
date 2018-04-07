import Auth from "./Auth.class";
import React from "react";
import {Route, Redirect} from "react-router-dom";

export default PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>  Auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
            )
        }
    />
);

