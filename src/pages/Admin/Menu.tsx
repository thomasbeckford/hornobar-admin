import React from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const AdminMenu = () => {
    return (
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
                Pagina principal
                <Link to="/admin" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                Usuarios
                <Link to="/admin/users" />
            </Menu.Item>
        </Menu>
    )
}

export default AdminMenu
