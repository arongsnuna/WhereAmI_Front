import { useState, useContext, useEffect } from 'react';
import LandmarkResult from '../components/LandmarkResult';
import "../global.css";
import { UserContext } from '../context/Context';
import { useNavigate, useParams  } from 'react-router-dom';
import {LandmarkResultProps, LandmarkSearch} from '../interface/landmark';
import * as api from '../api/index';
import { useQuery } from 'react-query';


const BookmarksDetail = () => {
    const [landmark, setLandmark] = useState<LandmarkSearch>()
    const [nearByLandmarks, setNearByLandmarks] = useState<LandmarkSearch[]>([]);
    const {landmarkName } = useParams();

    const {data:landmarkData, isLoading:isLandmarkDataLoading} = useQuery(['landmarkDetail'],()=>
        api.getData<LandmarkResultProps>(`/landmark/${landmarkName}`)
    );
    console.log(landmark);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLandmarkDataLoading && landmarkData) {
                setLandmark(landmarkData.landmark);
                setNearByLandmarks(landmarkData.nearByLandmarks);
            }
        };
        fetchData();
    }, [landmarkData, isLandmarkDataLoading]);

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

            <div className='flex'>
                <div className='w-1/5'>
                </div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                        <button style={{ fontFamily: 'GmarketSansMedium' }}
                            className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base"
                            onClick={handleLogin}>
                            {buttonText}
                        </button>
                </div>
            </div>

            <div>
                {landmark && <LandmarkResult landmark={landmark} nearByLandmarks={nearByLandmarks}/>}
            </div>
        </div>
    )
}

export default BookmarksDetail;
