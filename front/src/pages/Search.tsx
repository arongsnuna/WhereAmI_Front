import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {postData} from '../api/index';
import wherelogo from '../assets/where.png'
import React, { useState, useContext } from 'react';
import LandmarkResult from '../components/LandmarkResult';
import { UserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(UserContext);
    console.log('User state:', user);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    const [landmark, setLandmark] = useState(null);
    const [nearByLandmarks, setNearByLandmarks] = useState(null);
    
    const handleLogin = () => {
        if (user) {
            dispatch({ type: 'LOGOUT' });
        } else {
            navigate('/loginform');
        }
    };

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await postData('/image', formData, config);
            await setLandmark(response.landmark);
            await setNearByLandmarks(response.nearByLandmarks);
            } catch (err) {
            console.log(err);
            alert(err);
            }
    };
    const handleButtonClick = async()=>{
        if(fileInputRef.current && fileInputRef.current.files?.[0]){
            const file = fileInputRef.current.files[0];
            await handleImageUpload(file);
        }
    }

    const buttonText = user ? '로그아웃' : '로그인';

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <header className='absolute top-0 right-0 py-4 px-6 z-50'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                    {buttonText}
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
                {landmark && <LandmarkResult landmark={landmark} nearByLandmarks={nearByLandmarks}/>}
            </div>
        </div>
    )
}

export default Search;