import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function GuestRoute({ component: Component, ...rest }: any) {
    if (rest.state.loading) return <div>loading guest..</div>

    return (
        <Route
            {...rest}
            render={(props) => (rest.state.tokens ? <Redirect to="/admin" /> : <Component {...props} />)}
        />
    )
}

export default GuestRoute
