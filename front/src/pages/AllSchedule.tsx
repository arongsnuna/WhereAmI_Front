import { useState, useEffect, useContext } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button} from 'antd';
import { MySchedule } from '../interface/scheduleResult';

const AllSchedule=()=>{
    const navigate = useNavigate();
    const { userState, dispatch} = useContext(UserContext);

    // 일정 받아오기
    const [schedule, setSchedule] = useState<MySchedule>();
    const {data:scheduleData, isLoading:isScheduleDataLoading} = useQuery(['scehduler'],()=>
        api.getData<MySchedule>(`/scheduler`)
    );
    useEffect(() => {
      if(!isScheduleDataLoading&&scheduleData){
        setSchedule(scheduleData);
      }
    }, [scheduleData, isScheduleDataLoading]);

    const handleSchedulerClick = (schedulerId: number)=>{
      navigate(`/SchedulerResult/${schedulerId}`);
    }

    // 로그인, user 받아오기
    const handleLogin = () => {
      console.log(userState);
      if (userState.accessToken) {
          dispatch({ type: 'LOGOUT' });
      } else {
          navigate('/loginform');
      }
    };
    const navigateHome= ()=>{
        navigate('/');
    }
    const navigateMakeSchedule= () => {
        navigate("/MakeSchedule");
     }

    const buttonText = userState.accessToken ? '로그아웃' : '로그인';

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
							slidesToShow:1
						}
					}
				]
    };
    return(
        <div>
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
            {!userState.accessToken?(<h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로그인 후 이용해주세요!</h1>):(
                <>
                    {schedule?(
                        <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>일정</h2>
                    ):(<h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로딩중..</h1>)}
                    {schedule && Object.keys(schedule).length > 0 &&(
                        <div className="border-gray-200 border p-8 rounded-lg m-3">
                            <Slider {...settings}>
                                {Object.entries(schedule).map(([s,info])=>(
                                    <div key={s} className="flex justify-center px-2 pb-5" >
                                        <figure>
                                        <img src={info.imagePath} onClick={()=>handleSchedulerClick(info.schedulerId)}/><figcaption className='text-center pt-1' style={{fontFamily:'GmarketSansMedium'}}>[{info.title}]</figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                    {schedule?(
                        <div className='flex justify-center items-center p-5'>
                            <Button onClick={navigateMakeSchedule} className="mt-5" style={{fontFamily:'GmarketSansMedium'}}>
                                일정 만들러가기
                            </Button>
                        </div>
                    ):(<p></p>)}

                </>
            )}
        </div>
    )

}
export default AllSchedule;
