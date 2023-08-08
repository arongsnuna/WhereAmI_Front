import userSample from '../assets/userSample.png';
import wherelogo from '../assets/where.png'
import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import {User} from '../interface/user';
import { useQuery } from 'react-query';

const MyPage=()=> {
    const navigate = useNavigate();
    const { userState, dispatch, login } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState<User>({
      userName: '',
      password: '',
      profilePath: '',
      description: '',
      bookmarkCounts: {},
    })
    const {userName, password, profilePath, description, bookmarkCounts} = currentUser;
    const { data, isLoading } = useQuery(['user', userState.id], () =>
        api.getData<User>(`/user/${userState.id}`)
    );
    useEffect(() => {
      if(!isLoading&&data) {
        setCurrentUser(data);
        console.log('data',data);
      }
    }, [data, isLoading]);
    const handleLogin = () => {
      console.log(userState);
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

    const updateUserInfo = async (e: any) => {
        e.preventDefault();
        try{
            //업데이트해줘야함!!!
        }
        catch(err){
            console.log(err);
        }
    };
    const deleteUserInfo = async(e:any) => {
        e.preventDefault();
        try{
            const response = await api.deleteData(`/user/${userState.id}`)
            console.log(response.message);
            alert('삭제되었습니다.');
            //로그아웃 처리
            //홈화면으로 이동 - navigate 이용해서
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
						breakpoint: 768, //화면 사이즈 768px
						settings: {
							slidesToShow:2
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                        {buttonText}
                    </button>
                </div>
          </div>
          {!userState.accessToken? (
              <h1 className='text-center mt-10'>로그인 후 이용해주세요.</h1>
          ) :
          (<>
          <div className="flex">
              <div className="w-1/3 px-5">
              <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 ml-3'>마이페이지</h2>
                  <div className="border border-gray-200 p-4 rounded-lg">
                      <div className='flex items-center justify-center'>
                        {profilePath?(
                          <img src={profilePath} className='w-1/4 m-4' />
                        ):(
                          <img src={userSample} className='w-1/4 m-4' />
                        )}
                      </div>
                      <p className="mb-2">
                      <span className="font-bold" style={{fontFamily:'GmarketSansMedium'}}>이름: {userName}</span>
                      </p>
                      <p className="mb-2">
                      <span className="font-bold" style={{fontFamily:'GmarketSansMedium'}}>자기소개: {description}</span>
                      </p>
                  </div>
              </div>
              <div className="w-2/3 flex flex-col pr-5">
                  <div className="flex-1">
                      <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 ml-3'>북마크</h2>
                      <div className="border-gray-200 border rounded-lg items-center mb-8 pt-3" >
                        {bookmarkCounts && Object.keys(bookmarkCounts).length > 0 &&(
                          <Slider {...settings}>
                              {Object.entries(bookmarkCounts).map(([location,info])=>(
                                <div key={location} className="flex justify-center p-2" onClick={navigateBookmarks}>
                                  <figure>
                                  <img src={info.imagePath}/><figcaption className='text-center' style={{fontFamily:'GmarketSansMedium'}}>{location}({info.count})</figcaption>
                                  </figure>
                                </div>
                                ))
                              }

                          </Slider>
                        )}
                      </div>
                  </div>
                  <div className="flex-1 ">
                      <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-3 mb-1 ml-3'>일정</h2>
                      <div className="border-gray-200 border p-4 rounded-lg"></div>
                  </div>
              </div>
          </div>
          <div className="flex justify-center mt-4">
              {/* <form onSubmit={updateUserInfo}>
                  <label>
                      Name:
                      <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                  </label>
                  <label>
                      Email:
                      <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                  </label>
                  <label>
                      Password:
                      <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                  </label>

              </form> */}
              <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded m-2"
                      type="submit"
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
          </>)
          }
        </>
    );
};


export default MyPage;
