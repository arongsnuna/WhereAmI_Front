import userSample from '../assets/userSample.png';
import wherelogo from '../assets/where.png'
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as api from '../api/index';
import {useAuth} from '../context/AuthContext';
import {User} from '../interface/user';


const MyPage=()=> {
    const {setAuthState} = useAuth();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const id = "625534fb-09d0-4f1a-9bb6-149c122bb7a4";
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3R0ZXN0IiwiaWF0IjoxNjkxMTM4NDE4LCJleHAiOjE2OTExNzQ0MTh9.GVAQR65fRztvC2IaoaqosZlYsOYkCihr5VwNwltlXS8";
    setAuthState({id, accessToken});
    const {authState} =useAuth();
    useEffect(()=>{
        const fetchCurrentUser = async () => {
            const user= await api.getData(`/user/625534fb-09d0-4f1a-9bb6-149c122bb7a4`)
            //const user= await api.getData(`/user/${authState.id}`)
            setCurrentUser(user);
            console.log(user);
        };
        fetchCurrentUser();
    },[]);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    const [whereTraveled, setWhereTraveled] = useState(null);
    const [travelSchedule, setTraveSchedule] = useState(null);
    const updateUserInfo = (e:any) => {
        e.preventDefault();
        try{
            //업데이트해줘야함!!!
        }
        catch(err){
            console.log(err);
            alert(err);
        }
    };
    const deleteUserInfo = async(e:any) => {
        e.preventDefault();
        try{
            const response = await api.deleteData(`/user/${authState.id}`)
            alert(response.message);
            //로그아웃 처리
            //홈화면으로 이동 - navigate 이용해서
        }
        catch(err){
            console.log(err);
            alert(err);
        }

    };
    const settings = {
        dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
        infinite: false, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
        speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
        slidesToShow: 3, // 화면에 보여질 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        arrow: null, // 이전 화살표를 숨김
        draggable : true, //드래그 가능 여부
        responsive: [ // 반응형 웹 구현 옵션
					{
						breakpoint: 768, //화면 사이즈 768px
						settings: {
							slidesToShow:2
						}
					}
				]
    };
    return (
        <>
        <div className='flex items-center justify-center'>
            <img src={wherelogo} alt='wherelogo' className='w-1/4 h-auto'/>
        </div>
        {!currentUser? <p>Please log in</p> :
        <>
        <div className="flex">
            <div className="w-1/3 p-5">
                <div className="bg-gray-300 border p-4 rounded-lg">
                    <div className='flex items-center justify-center'>
                        <img src={userSample} className='w-1/4 m-4' />
                    </div>
                    <p className="mb-2">
                    <span className="font-bold">이름: {currentUser.userName}</span>
                    </p>
                    <p className="mb-2">
                    <span className="font-bold">자기소개: {currentUser.description}</span>
                    </p>
                </div>
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="flex-1">
                    <h2>북마크</h2>
                    <div className="bg-gray-300 border rounded-lg items-center mb-8 pt-3">
                        <Slider {...settings}>
                        <div className="flex items-center justify-center p-2">
                            {currentUser.bookmarkCounts.map((bookmark)=>(
                                <figure>
                                <img src={bookmark.landmarkName} alt={bookmark.landmarkName}/><figcaption className='text-center'>{bookmark.landmarkName}({bookmark.counts})</figcaption>
                                </figure>
                            ))}
                        </div>
                        </Slider>
                    </div>
                </div>
                <div className="flex-10">
                    <h2>여행 다녀온 지역</h2>
                    <div className="bg-gray-300 border p-4 rounded-lg"></div>
                </div>
                <div className="flex-1 ">
                    <h2>일정</h2>
                    <div className="bg-gray-300 border p-4 rounded-lg"></div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-4">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded m-2"
            onClick={updateUserInfo}
            >
            Update User Info
            </button>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded m-2"
            onClick={deleteUserInfo}
            >
            Delete User Info
            </button>
        </div>
        </>
        }
        </>
    );
};


export default MyPage;
