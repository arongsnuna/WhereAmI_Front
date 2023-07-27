
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {postData} from '../api/index';
import wherelogo from '../assets/where.png'
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';

const Intro = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleLogin = () => {

    };

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await postData('/image', formData, config);
            console.log(response.result);

            // 서버에서 받은 데이터를 쿼리 키로 캐싱합니다.
            queryClient.setQueryData('landmark', response.landmark);
            queryClient.setQueryData('nearByLandmarks', response.nearByLandmarks);
            navigate('/search');
            } catch (err) {
            console.log(err);
        }
    };
    const handleButtonClick = async()=>{
        if(fileInputRef.current && fileInputRef.current.files?.[0]){
            const file = fileInputRef.current.files[0];
            await handleImageUpload(file);
        }
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <header className='absolute top-0 right-0 py-4 px-6 z-50'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                    로그인
                </button>
            </header>

            <div className='flex flex-col items-center justify-center'>
                <div>
                    <a className='text-2xl mb-4 text-center'><img src={wherelogo} className="logo sm:mx-auto" alt="Vite logo" /></a>
                        <div className='w-full flex justify-center'>
                            <div className='relative border border-gray-200 rounded-lg mt-2 mr-2 inline-block'>
                                <FontAwesomeIcon icon={faSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    className="pl-8 py-2 pr-4 bg-transparent w-full outline-none"
                                    type="file" accept='image/*'
                                    ref={fileInputRef}
                                />
                            </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2"
                            onClick={handleButtonClick}
                            >검색
                        </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;
