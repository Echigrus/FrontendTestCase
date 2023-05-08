import React, { useRef, useState } from 'react';
import { Modal, message, Button, Space, Input } from 'antd';
import { ImgCropper } from './imgCropper';
import { GlobalConstants } from '@constants/global';
import heic2any from 'heic2any';

const isAllowImage = (width: number, height: number) => {
    return (
        width >= GlobalConstants.UploadImg.minHeight &&
        width <= GlobalConstants.UploadImg.maxHeight &&
        height >= GlobalConstants.UploadImg.minHeight &&
        height <= GlobalConstants.UploadImg.maxHeight
    );
};

const convertBase64ToBlob = (base64Image: string) => {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
};

const isJpgOrPng = (file: File) => {
    return file.type === 'image/jpeg' || file.type === 'image/png';
};

type Props = {
    photoSrc?: string,
    disabled?: boolean,
    onImageSelect: (file: File) => void,
    onImageDelete: () => void
};

const ImgUploader = ({ photoSrc, disabled = false, onImageSelect, onImageDelete }: Props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [img, setImg] = useState<string>('');
    const cropImg = useRef('#');
    const [fileName, setFileName] = useState('');
    const [cropName, setCropName] = useState(photoSrc ?? '');

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleOk = () => {
        setCropName(fileName);
        const blob = convertBase64ToBlob(cropImg.current);
        const file = new File([blob], fileName);
        onImageSelect(file);
        setModalOpen(false);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target;
        let file = input.files[0];
        const fileName = file.name;

        if (fileName.includes('.heic')) {
            const newName = fileName.replace(/\.heic$/, '.jpg')
            const convertFile = await heic2any({ blob: file, toType: 'image/jpeg' });
            if (!Array.isArray(convertFile)) {
                file = new File([convertFile], newName, {
                    lastModified: +new Date().toISOString(),
                    type: 'image/jpeg',
                });
            }
        }

        if (!isJpgOrPng(file)) {
            message.error('Пожалуйста, попробуйте загрузить изображение в другом формате!');
            return false;
        }

        if (file.size >= GlobalConstants.UploadImg.maxSize) {
            message.error('Файл должен весить меньше 10MB');
            return false;
        }

        const reader = new FileReader();
        if (!reader) return false;

        reader.onload = () => {
            const imgUrl = reader.result.toString();
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                input.value = null;
                if (!isAllowImage(img.width, img.height)) {
                    message.error('Разрешение картинки должно быть от 200х200 до 5120х5120');
                    return false;
                }
                setImg(imgUrl);
                setModalOpen(true);
                setFileName(file.name);
                return true;
            };
        };
        reader.onerror = () => {};
        reader.readAsDataURL(file);
        return true;
    };

    const handleOnCrop = (img) => {
        cropImg.current = img
    };

    return (
        <div>
            <Space.Compact className="uploader__controls">
                <div className="uploader__input-wrapper">
                    <Input 
                        disabled={disabled}
                        className="uploader__mask" 
                        value={cropName ? cropName : 'Выберите или перетащите файл'} 
                    />
                    <input
                        className="uploader__input"
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*, .heic"
                    />
                </div>
                <Button 
                    danger
                    disabled={cropName == '' || disabled} 
                    onClick={() => {
                        onImageDelete();
                        setCropName('');
                    }} 
                    type="primary"
                >
                    Удалить
                </Button>
            </Space.Compact>
            <Modal
                title="Выберите область"
                cancelText="Отменить"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <ImgCropper img={img} handleOnCrop={handleOnCrop} />
            </Modal>
        </div>
    );
};

export { ImgUploader, isAllowImage };
