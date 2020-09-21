import React, { useEffect, useState } from 'react'
import './styles.css'
import { Typography } from 'antd'
import { WhatsAppOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { storage } from 'firebase'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function Menu() {
    const [image, setImage] = useState<any>(null)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    if (image) {
        console.log(image)
    }

    useEffect(() => {
        storage()
            .ref(`images/menu.jpg`)
            .getDownloadURL()
            .then((url) => {
                if (url) {
                    setImage(url)
                }
            })
    }, [])

    return (
        <div className="layout">
            <h1 className="title">HORNOBAR</h1>
            <a href="https://www.instagram.com/hornobar/?hl=en">
                <Button danger type="primary">
                    SEGUINOS
                </Button>
            </a>
            <div style={{ margin: '30px' }}>
                {image ? <img className="menuImage" src={image} alt="menuHornobar" /> : <Spin indicator={antIcon} />}
            </div>

            {/* <div className="block-social-icons">
                <a target="_link" href="https://wa.me/541134908167?text=Me%20gustaria%20una%20rica%20burga">
                    <WhatsAppOutlined className="socialIcon" />
                </a>
                <a target="_link" href="https://www.instagram.com/hornobar/?hl=en">
                    <InstagramOutlined className="socialIcon" />
                </a>
                <a target="_" href="https://www.facebook.com/pages/category/Restaurant/Hornobar-939390592790568/">
                    <FacebookOutlined className="socialIcon" />
                </a>
            </div> */}
        </div>
    )
}
