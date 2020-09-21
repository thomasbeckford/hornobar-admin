import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { AuthContext } from './context/Auth'
import { useAuth } from './hooks/useAuth'

import Admin from './pages/Admin'
import Login from './pages/Login'
import Menu from './pages/Menu'

import PrivateRoute from './components/PrivateRoute'
import GuestRoute from './components/GuestRoute'

export default function App() {
    const { Provider: AuthProvider } = AuthContext
    const { auth, state } = useAuth()

    if (state.loading) return <div>Loading..</div>

    return (
        <AuthProvider value={auth}>
            <Router>
                <Route exact path="/">
                    <Redirect to="/menu" />
                </Route>
                <GuestRoute exact path="/menu" component={Menu} state={state} />
                <GuestRoute exact path="/login" component={Login} state={state} />
                <PrivateRoute path="/admin" component={Admin} state={state} />
            </Router>
        </AuthProvider>
    )
}
