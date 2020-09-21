import React, { useState } from 'react'
import { storage } from 'firebase'
import { Upload, Button, message } from 'antd'
import { LoadingOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'

export default function HomePage() {
    const [image, setImage] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(false)
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg']

    const props = {
        beforeUpload: (file: any) => {
            if (file && acceptedImageTypes.includes(file['type'])) {
                const uploadTask = storage().ref(`images/menu.jpg`).put(file)
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        message.error(`El archivo ${file.name} no se subio, ${error}`)
                    },
                    () => {
                        storage()
                            .ref(`images/menu.jpg`)
                            .getDownloadURL()
                            .then((url) => {
                                setImage(url)
                                setLoading(false)
                            })
                        message.success(`El archivo ${file.name} se subio, claro!`)
                    },
                )
                return false
            } else {
                message.error(`El archivo ${file.name} no tiene un formato PNG, JPG o JPEG!`)
                return false
            }
        },
        onChange: (info: any) => {
            setLoading(true)
            if (info.file && !acceptedImageTypes.includes(info.file['type'])) {
                setLoading(false)
                setImage(null)
            }
        },
    }

    return (
        <div>
            <h3>Hace click para subir la imagen, una vez que la elijas, la imagen se sube automaticamentete.</h3>
            <Upload {...props} name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false}>
                {image && !loading ? (
                    <img src={image} alt="avatar" style={{ width: '100%' }} />
                ) : (
                    <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>
        </div>
    )
}
