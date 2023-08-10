import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {postData} from '../api/index';
import wherelogo from '../assets/where.png'
import React, { useState, useContext, useEffect } from 'react';
import LandmarkResult from '../components/LandmarkResult';
import "../global.css";
import { UserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import {LandmarkResultProps, LandmarkSearch} from '../interface/landmark';


const Search = () => {

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    const [landmark, setLandmark] = useState<LandmarkSearch>()
    const [nearByLandmarks, setNearByLandmarks] = useState<LandmarkSearch[]>([]);

    // 검색 버트 클릭했을 때
    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response:LandmarkResultProps = await postData('/image', formData, config);
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

    // 로그인된 유저 확인
    const navigate = useNavigate();
    const { userState, dispatch } = useContext(UserContext);
    useEffect(() => {
        console.log("User state updated:", userState);
    }, [userState]);

    const handleLogin = () => {
        if (userState.accessToken) {
            dispatch({ type: 'LOGOUT' });
        } else {
            navigate('/loginform');
        }
    };
    const navigateHome= ()=>{
        setLandmark(undefined);
        setNearByLandmarks([]);
        navigate('/');
    }
    const buttonText = userState.accessToken ? '로그아웃' : '로그인';

    return (
        <div>
        {landmark &&
            <div className='flex'>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                            {buttonText}
                        </button>
                </div>
            </div>
        }
        {!landmark &&
            <div>
                <div className='w-full flex justify-end pt-5 pr-5'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                            {buttonText}
                        </button>
                </div>
                <a className='h-full w-full mb-4 flex items-center justify-center'><img src={wherelogo} className='h-full ' alt="Vite logo" /></a>
            </div>
        }
        <div className='flex'>

        <div className='w-1/6'> </div>
        <div className='m-4 w-4/6 flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <div>
                        <div className='w-full flex justify-center my-auto '>
                            <div className='flex border border-gray-200 rounded-lg mr-2 '>
                                <FontAwesomeIcon icon={faSearch} className="flex mx-auto ml-3 relative top-1/2 transform -translate-y-1/2 text-gray-400" />

                                <input
                                    className="pl-5 py-2 pr-4 bg-transparent w-full outline-none text-center text-xs sm:text-base"
                                    type="file" accept='image/*'
                                    ref={fileInputRef}
                                />
                            </div>
                            <button
                                className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-3 rounded-lg my-auto text-xs sm:text-base"
                                onClick={handleButtonClick}
                                >검색
                            </button>
                    </div>
                </div>
            </div>
        </div>
        </div >
        {landmark && <LandmarkResult landmark={landmark} nearByLandmarks={nearByLandmarks}/>}
        </div>
    )
}

export default Search;
