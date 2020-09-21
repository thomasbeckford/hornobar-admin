import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { AuthContext } from '../../context/Auth'
import { Typography } from 'antd'
import './Login.css'
import { doSignInWithEmailAndPassword } from '../../utils/firebase/auth'

const Login = (): JSX.Element => {
    const { login } = useContext(AuthContext)!
    const [error, setError] = React.useState('')

    const [form] = Form.useForm()
    const [, forceUpdate] = useState() // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = (values: any) => {
        console.log(values)
        doSignInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                console.log(res)
                if (res.user) {
                    login(
                        { id: res.user.uid, email: res.user.email },
                        { accessToken: res.user.refreshToken, refreshToken: res.user.refreshToken },
                    )
                }
            })
            .catch((error) => {
                // Handle Errors here.
                let errorMessage = error.message
                if (errorMessage) {
                    setError(errorMessage)
                }
            })
    }

    return (
        <Card title="Admin Login" className="login-card">
            <div>
                <Typography>{error.length ? error : null}</Typography>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Por favor ingresa tu email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingresa tu password!' }]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate className="login-button">
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    form.getFieldsError().filter(({ errors }: any) => errors.length).length
                                        ? true
                                        : false
                                }
                            >
                                Log in
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </Card>
    )
}

export default Login
