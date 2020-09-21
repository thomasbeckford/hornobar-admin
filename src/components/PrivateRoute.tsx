import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }: any) {
    if (rest.state.loading) return <div>loading private route..</div>

    return <Route {...rest} render={(props) => (rest.state.tokens ? <Component {...props} /> : <Redirect to="/" />)} />
}

export default PrivateRoute
