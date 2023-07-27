

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";

import { postData } from '../api/index';
import Main from '../components/Main';

const Search = () => {
    const { data: landmark} = useQuery('landmark');
    const { data: nearByLandmarks } = useQuery('nearByLandmarks');


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
            console.log(response);

            // 서버에서 받은 데이터를 쿼리 키로 캐싱합니다.
            queryClient.setQueryData('landmark', response.landmark);
            queryClient.setQueriesData('nearByLandmarks', response.nearByLandmarks);

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
        <div className="h-screen bg-gray-50 flex items-center justify-center">
            <div className="container mx-auto p-4 max-w-xl">
                <header className="absolute top-0 right-0 py-4 px-6">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                        로그인
                    </button>
                </header>
                <div className='flex flex-col items-center justify-center mx-auto'>
                    <h1 className="text-2xl mb-4">여긴 어디?</h1>
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
                    >
                        검색
                    </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-start mt-4">
                    <div className="border border-gray-200 rounded col-span-2 flex flex-col items-center p-4 overflow-hidden">
                        <div>
                            <img src={landmark.imagePath} alt={landmark.name} style={{ width: '640px', maxHeight: '480px', height: 'auto' }} />
                        </div>
                        <h2 className="w-full text-center">{landmark.name}</h2>
                        <p className="w-full text-center">{landmark.address}</p>
                    </div>
                    <div>
                        {landmark ? <Main landmarkName={landmark.name} /> : 'Loading...'}
                    </div>
                </div>
                <div>
                    {nearByLandmarks.map((land)=>(
                        <div className="border border-gray-200 rounded col-span-2 flex flex-col items-center p-4 overflow-hidden">
                            <div className="w-full h-2/3">
                                <img src={land.imagePath} alt="sample"  />
                            </div>
                            <h2>{land.name}</h2>
                            <p>{land.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;
