import React, { useContext } from 'react'
import { Layout, Button } from 'antd'
import { Route } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'
import AdminMenu from './Menu'
import 'antd/dist/antd.css'
import './Admin.css'
import { useAuth } from '../../hooks/useAuth'
import HomePage from './HomePage'

function Admin({ match }: any): JSX.Element {
    const { Header, Content, Footer, Sider } = Layout
    const [collapsed, setCollapsed] = React.useState(false)
    const { logout } = useContext(AuthContext)!
    const { state } = useAuth()

    return (
        <Layout>
            <Sider
                defaultCollapsed
                breakpoint="sm"
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            >
                <div className="logo admin-logo">Hornobar</div>
                <AdminMenu />
            </Sider>
            <Layout>
                <Header className="header-admin-layout">
                    <div className="admin-user-avatar">
                        <Button onClick={() => logout()}>LOG OUT</Button>
                    </div>
                </Header>
                <Content className="content-background">
                    <Route path={match.url + '/'} exact render={() => <HomePage />} />
                </Content>

                <Footer style={{ textAlign: 'center' }}>Troya ©2020 Created by Awaitcode</Footer>
            </Layout>
        </Layout>
    )
}

export default Admin
