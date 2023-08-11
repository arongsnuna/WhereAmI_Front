import userSample from '../assets/userSample.png';
import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import {User} from '../interface/user';
import { useQuery } from 'react-query';
import { MySchedule } from '../interface/scheduleResult';

const MyPage=()=> {
    const navigate = useNavigate();
    const { userState, dispatch} = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState<User>({
      userName: '',
      password: '',
      profilePath: '',
      description: '',
      bookmarkCounts: {},
      email: '',
    })
    const {userName, profilePath, description, bookmarkCounts, email} = currentUser;
    const { data: userData, isLoading: isUserDataLoading, error: userError } = useQuery(['user', userState.id], () => api.getData<User>(`/user/${userState.id}`));
    useEffect(()=>{
        if(!isUserDataLoading&&userData){
            setCurrentUser(userData);
          } if (userError) {
            console.error("Error fetching user data:", userError); // <-- Added error logging
        }
      }, [userData,isUserDataLoading, userError]);

    // 일정 받아오기
    const [schedule, setSchedule] = useState<MySchedule>();
    const {data:scheduleData, error: scheduleError} = useQuery(['scehduler'],()=>
        api.getData<MySchedule>(`/scheduler`)
    );
    useEffect(() => {
      if (userData) setCurrentUser(userData);
      if (scheduleData) setSchedule(scheduleData);
  }, [userData, scheduleData]);

  useEffect(() => {
      if (userError) console.error("Error fetching user data:", userError);
      if (scheduleError) console.error("Error fetching schedule data:", scheduleError);
  }, [userError, scheduleError]);


    const handleSchedulerClick = (schedulerId: number)=>{
      navigate(`/SchedulerResult/${schedulerId}`);
    }

    // 로그인, user 받아오기
    const handleLogin = () => {
      if (userState.accessToken) {
          dispatch({ type: 'LOGOUT' });
      } else {
          navigate('/loginform');
      }
    };
    const navigateBookmarks = ()=>{
        navigate('/bookmarks');
    }
    const navigateHome= ()=>{
        navigate('/');
    }
    const navigateUpdate = ()=>{
        navigate('/UpdateMyPage');
    }
    const navigateAllSchedule = ()=>{
      navigate('/AllSchedule');
    }
    const deleteUserInfo = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try{
            await api.deleteData(`/user/${userState.id}`)
            alert('삭제되었습니다.');
            dispatch({ type: 'LOGOUT' });
            navigate('/')
        }
        catch(err){
            console.log(err);
            alert(err);
        }

    };

    const buttonText = userState.accessToken ? '로그아웃' : '로그인';
    const settings = {
        dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
        infinite: false, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
        speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
        slidesToShow: 3, // 화면에 보여질 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        arrow: null, // 이전 화살표를 숨김
        draggable : true, //드래그 가능 여부
        margin: 20,
        responsive: [ // 반응형 웹 구현 옵션
        {
          breakpoint: 1620,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 4
          }
      },
      {
          breakpoint: 1200,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3
          }
      },
      {
          breakpoint: 900,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      },
      {
          breakpoint: 767,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
  };

    return (
        <>
          <div className='flex'>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                    <button style={{ fontFamily: 'GmarketSansMedium' }}
                      className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                        {buttonText}
                    </button>
                </div>
          </div>
          {!userState.accessToken? (
              <h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로그인 후 이용해주세요.</h1>
          ) :
          (<>
            {currentUser&&bookmarkCounts&&schedule?(
              <>
                <div className="flex">
                <div className="w-1/3 px-5">
                <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 text-s sm:text-m text-center'>마이페이지</h2>
                  <div className="bg-light-blue border border-gray-200 p-4 rounded-lg">
                        <div className='flex items-center justify-center'>
                          {profilePath?(
                            <img src={profilePath} className='w-1/4 m-4' />
                          ):(
                            <img src={userSample} className='w-1/4 m-4' />
                          )}
                        </div>
                        <p className="mb-2 text-xs sm:text-base">
                        <span className="font-bold" style={{fontFamily:'GmarketSansMedium'}}>이름: {userName}</span>
                        </p>
                        <p className="mb-2 text-xs sm:text-base">
                        <span className="font-bold" style={{fontFamily:'GmarketSansMedium'}}>닉네임: {userName}</span>
                        </p>
                        <p className="mb-2 text-xs sm:text-base">
                            <span className="font-bold" style={{fontFamily:'GmarketSansMedium'}}>이메일: {email}</span>
                        </p>
                    </div>
                </div>
                <div className="w-2/3 flex flex-col pr-5">
                    <div className="flex-1">
                        <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 text-s sm:text-m text-center'>북마크</h2>
                        <div className="bg-light-blue border-gray-200 border rounded-lg items-center mb-1 pt-3 pb-4" >
                          {bookmarkCounts && Object.keys(bookmarkCounts).length > 0 &&(
                            <Slider {...settings}>
                                {Object.entries(bookmarkCounts).map(([location,info])=>(
                                  <div key={location} className="flex justify-center p-2 text-xs sm:text-base" onClick={navigateBookmarks}>
                                    <figure className="flex flex-col items-center p-2" style={{ maxHeight: '300px' }}>
                                          <img src={info.imagePath} className='mb-2 object-cover h-40' />
                                          <figcaption className='text-center' style={{ fontFamily: 'GmarketSansMedium' }}>
                                              {location} ({info.count})
                                          </figcaption>
                                      </figure>
                                  </div>
                                  ))
                                }
                            </Slider>
                          )}
                        </div>
                    </div>
                    <div className="flex-1 mt-5">
                        <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 text-s sm:text-m text-center'>일정</h2>
                        <div className="bg-light-blue border-gray-200 border p-4 rounded-lg">
                          {schedule && Object.keys(schedule).length > 0 &&(
                            <Slider {...settings}>
                                {Object.entries(schedule).map(([s,info])=>(
                                  <div key={s} className="flex justify-center p-2 text-xs sm:text-base" onClick={navigateAllSchedule}>
                                    <figure className="flex justify-center p-2" style={{ maxHeight: '300px' }}>
                                    <img src={info.imagePath} onClick={()=>handleSchedulerClick(info.schedulerId)} className='mb-2'/><figcaption className='text-center' style={{fontFamily:'GmarketSansMedium'}}>[{info.title}]</figcaption>
                                    </figure>
                                  </div>
                                  ))
                                }
                            </Slider>
                          )}
                        </div>
                    </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                        className="m-1 bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base"
                        type="submit"
                        style={{fontFamily:'GmarketSansMedium'}}
                        onClick = {navigateUpdate}
                    >
                        회원정보 수정
                    </button>
                <button
                    className="m-1 bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base"
                    onClick={deleteUserInfo}
                    style={{fontFamily:'GmarketSansMedium'}}
                >
                    회원 탈퇴
                </button>
              </div>
              </>

            ):(
              <h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로딩중...</h1>
            )}
          </>)
          }
        </>
    );
};


export default MyPage;
