import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ProtectedRoutes({ component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => {
                const session = cookies.get("session");

                if (session) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname:"/login",
                                state: {
                                    from: props.location,
                                }
                            }}
                        />
                    );
                }
            }}
        />
    )
}