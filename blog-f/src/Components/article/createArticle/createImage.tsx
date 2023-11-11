import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";

interface ICreatePicture {
    changeAction: (event: string) => void;
}
export default function ImageUploader({changeAction}: ICreatePicture) {
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [isReady, setReady] = useState<boolean>(true);
    const [uploadedImage, setUploadedImage] = useState<string>();
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result as string;
                setBase64Image(base64);
            };
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        if(!base64Image) return;
        const body = new FormData();
        body.append("image", base64Image.replace(/.*base64,/, ''));

        setReady(false);
        axios.post(`https://api.imgbb.com/1/upload?key=cab32367ddc6205049c003db91e7dd62`, body,
            {
            signal: controller.signal,
        })
            .then(result => {
                const image = result.data.data.image.url;
                setUploadedImage(image);
                setReady(true);
                changeAction(image);
            })
        return () => {
            controller.abort()
        }
    }, [base64Image])

    return (
        <div>
            <input
                className={`${!isReady ? '!file:bg-gray-500' : ''} mb-2.5 file:bg-cyan-600 file:border-cyan-600 transition-transform transform file:text-white file:hover:scale-95`}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isReady}
            />
            {!!uploadedImage && isReady && (
                <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className={'object-scale-down max-h-[400px] md:min-w-full'}
                    style={{ maxWidth: '100%' }}
                />
            )}
        </div>
    );
};