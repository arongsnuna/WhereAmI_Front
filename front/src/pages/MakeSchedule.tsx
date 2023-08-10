import { useState, useEffect, useContext } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BookmarkZip } from '../interface/bookmark';
import CalendarComponent from '../components/Calendar';
import { Button, Modal } from 'antd';
import { TripSchedule } from '../interface/scheduleResult';

// interface CalendarProps {
//     startDate: string | null;
//     endDate: string | null;
//     onStartDateChange: (newStartDate: string | null) => void;
//     onEndDateChange: (newEndDate: string | null) => void;
//     onSendDates: () => void; // 추가
// }

const MakeSchedule=()=>{
    const { userState, dispatch} = useContext(UserContext);
    const [bookmarkZip, setBookmarkZip] = useState<BookmarkZip[]>([]);
    const { data, isLoading } = useQuery(['bookmarks', userState.id], () =>
        api.getData<BookmarkZip[]>(`/bookmarks/user`)
    );
    useEffect(() => {
      if(!isLoading&&data) {
        setBookmarkZip(data);
      }
    }, [data, isLoading]);
    const buttonText = userState.accessToken ? '로그아웃' : '로그인';
    const navigate = useNavigate();
    const handleLogin = () => {
        if (userState.accessToken) {
            dispatch({ type: 'LOGOUT' });
        } else {
            navigate('/loginform');
        }
    };
    const navigateHome= ()=>{
        navigate('/');
    }

    // img 클릭
    const [selectedImgPath, setSelectedImgPath] = useState<string[]>([]); // 추가된 부분

    const handleImgClick = (index: number, name: string) => {
        setSelectedImgPath(prevPaths =>[...prevPaths, name])
        console.log(index);
    };
    const selectedImgPathString = selectedImgPath.join(', ');

    // 캘린더 모달창
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 모달의 가시성 상태

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    // 시작날짜와 끝 날짜 받아오기
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const handleStartDateChange = (newStartDate: string | null) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate: string | null) => {
        setEndDate(newEndDate);
    };
    const handleSendDates = () => {
        if (startDate && endDate) {
            // 일정 저장하는 로직 또는 다른 작업 수행
            closeModal(); // 저장 후 모달 닫기
        } else {
            console.log('시작과 마치는 날짜를 선택해 주셔야 됩니다.');
            alert('시작과 마치는 날짜를 선택해 주셔야 됩니다.');
        }
    };
    const dates = startDate +', '+endDate;

    // api 보내기
    const token = localStorage.getItem('accessToken');
    const makeScheduleApi = async()=>{
        const response = await api.postData<TripSchedule>(`/scheduler`,{
            place: selectedImgPathString,
            date: dates,
            title: scheduleTitle,
            userId: userState.id,
            startDate: startDate,
            endDate: endDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        navigate(`/SchedulerResult/${response.id}`);
    }
    // 제목 받아오기
    const [scheduleTitle, setScheduleTitle] = useState<String>("");

    // slider settings
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
    return(
        <div>
            <div className='flex'>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                        {buttonText}
                    </button>
                </div>
            </div>
            <div className='flex flex-col p-5'>
                <div className='flex justify-center items-center'>
                    <h1 className='w-full m-3 p-2 items-center text-center text-bold border border-gray-200 rounded' style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>일정 만들기</h1>
                </div>
                <div className='flex justify-center items-center' style={{ fontFamily: 'GmarketSansMedium' }} >
                    {selectedImgPathString.length > 0? (
                            <div>
                                <div className='flex w-full justify-center'>
                                    <p className='flex justify-center items-center font-bold font-l'>선택한 장소:</p>
                                    </div>
                                    <div>
                                        <p className='w-full justify-center items-center'>{selectedImgPathString}</p>
                                </div>
                            </div>
                        ):(<div>
                                <div className='flex w-full justify-center'>
                                    <p className='flex justify-center items-center'>선택한 장소: 없음</p>
                                </div>
                                <div>
                                    <p className='w-full justify-center items-center font-xs'>아래 북마크에서 선택하세요.</p>
                                </div>
                            </div>)
                    }
                </div>
                <input
                    type="text"
                    placeholder="일정 제목 입력"
                    onChange={(e) => setScheduleTitle(e.target.value)}
                    style={{ textAlign: 'center', }}
                />
                <div className='justify-center items-center' style={{ fontFamily: 'GmarketSansMedium' }}>
                    <div className='justify-center items-center flex w-full'>
                        <p>일정 시작 날짜:</p>
                    </div>
                    <div className='justify-center items-center flex w-full'>
                        <p>{startDate?(<p className='w-full justify-center items-center'>{startDate}</p>):(<p className='w-full justify-center items-center'>미정</p>)}</p>
                    </div>
                </div>
                <div className='justify-center items-center' style={{ fontFamily: 'GmarketSansMedium' }}>
                    <div className='justify-center items-center flex w-full'>
                        <p>일정 끝 날짜:</p>
                    </div>
                    <div className='justify-center items-center flex w-full'>
                        <p>{endDate?(<p className='w-full justify-center items-center'>{endDate}</p>):(<p className='w-full justify-center items-center'>미정</p>)}</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Button onClick={openModal} className="mt-5">
                        날짜 선택하기
                    </Button>

                    {/* CalendarComponent 모달 */}
                    <Modal
                        title="Calendar"
                        visible={isModalVisible}
                        onCancel={closeModal}
                        footer={null}
                    >
                        <CalendarComponent
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={handleStartDateChange}
                            onEndDateChange={handleEndDateChange}
                            onSendDates={handleSendDates} // 추가
                        />
                    </Modal>
                </div>
                <Button onClick={()=>makeScheduleApi()} className="mt-5">
                    일정 만들기
                </Button>
            </div>
            {bookmarkZip &&  Object.keys(bookmarkZip).length>0 ?(
                bookmarkZip.map((item:any)=>(
                        <div className="border border-gray-200 rounded m-2 justify-center text-bold" key={item.siDo}>
                            <h2 style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} className='m-3'>{item.siDo}</h2>
                            <div>
                                <Slider {...settings}>
                                    {item.bookmarks.map((bookmark: any, imgIndex: number) => (
                                        <figure className="flex justify-center p-2" key={imgIndex}>
                                            <img
                                                onClick={() => handleImgClick(imgIndex, bookmark.name)}
                                                src={bookmark.imagePath}
                                            />
                                            <figcaption style={{ fontFamily: 'GmarketSansMedium' }} className='text-center m-1'>
                                                {bookmark.name}
                                            </figcaption>
                                        </figure>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                ))
            ):(<h1>북마크 로딩 중..</h1>)
            }


        </div>
    )

}
export default MakeSchedule;
