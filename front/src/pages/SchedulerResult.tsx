import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useNavigate, useParams  } from 'react-router-dom';
import { TripSchedule, ScheduleItem } from '../interface/scheduleResult';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';


interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imagePath: string;
    imageName: string;
    description: string;
    recommendPlace:string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imagePath, imageName,description, recommendPlace}) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-white p-8 m-5 rounded-lg shadow-lg border border-gray-100">
            <div className='flex justify-center'>
                <img src={imagePath} alt={imageName} className="w-1/2 h-auto mb-4 rounded items-center" />
            </div>
            <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='flex justify-center items-center'>{imageName}</h2>
            <br/>
            {description && <p style={{ fontFamily: 'GmarketSansMedium' }}>설명:  {description}</p>}
            <br/>
            {recommendPlace && <p style={{ fontFamily: 'GmarketSansMedium' }}>주변 장소: {recommendPlace}</p>}
            <br/>
            <div className="flex justify-center">
                <button onClick={onClose} style={{ fontFamily: 'GmarketSansMedium' }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
            </div>
        </div>
        </div>
    );
};

const SchedulerResult=()=> {
    const { userState, dispatch } = useContext(UserContext);
    const [oneSchedule, setOneSchedule] = useState<TripSchedule>();
    const [oneScheduleItems, setOneScheduleItems] = useState<{ [date: string]: ScheduleItem[]}>({});
    const { schedulerId } = useParams();
    const {data:oneScheduleData, isLoading:isOneScheduleDataLoading} = useQuery(['scehduler'],()=>
        api.getData<TripSchedule>(`/scheduler/${schedulerId}`)
    );
    useEffect(() => {
        const fetchData = async () => {
            if (!isOneScheduleDataLoading && oneScheduleData) {
                setOneSchedule(oneScheduleData);
                if (oneSchedule) {
                    setOneScheduleItems(oneSchedule.schedule[0]);
                }
            }
        };
        fetchData();
    }, [oneScheduleData, isOneScheduleDataLoading, oneSchedule]);

    // 일정 삭제
    const deleteSchedule = async()=>{
        api.deleteData(`/scheduler/${userState.id}/${schedulerId}`);
        alert('이 일정은 삭제되었습니다!');
        navigate('/AllSchedule');
    }
    // 클릭했을때 모달창 뜨도록
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedImageInfo, setSelectedImageInfo] = useState<ScheduleItem | null>(null);

    const openImageModal = (imagePath: string, item: ScheduleItem) => {
        setIsImageModalOpen(true);
        setSelectedImage(imagePath);
        setSelectedImageInfo(item);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage('');
        setSelectedImageInfo(null);
    };

    const buttonText = userState.accessToken ? '로그아웃' : '로그인';
    const navigate = useNavigate();
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
    const settings = {
        dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
        infinite: true, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
        speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
        slidesToShow: 3, // 화면에 보여질 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        arrow: null, // 이전 화살표를 숨김
        draggable : true, //드래그 가능 여부
        initialSlide:1,
        responsive: [ // 반응형 웹 구현 옵션
					{
						breakpoint: 640, //화면 사이즈 768px
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
                    <button className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" style={{fontFamily:'GmarketSansMedium'}} onClick={handleLogin}>
                        {buttonText}
                    </button>
                </div>
            </div>
            <div>
                {oneScheduleData && oneSchedule ?(
                    <div>
                        <div className='w-full flex'>
                            <div className='w-2/5'></div>
                            <h1 className='w-full m-3 p-2 items-center text-center text-bold border border-gray-200 rounded' style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>
                                {oneSchedule.title}
                            </h1>
                            <div className='w-2/5 flex justify-center items-center'><FontAwesomeIcon icon={faTrash}  onClick={deleteSchedule}/></div>
                        </div>
                        <Slider {...settings}>
                            {oneScheduleItems && Object.keys(oneScheduleItems).map(date => (
                                <div key={date} className='w-1/3'>
                                    <p className='text-center' style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>Date: {date}</p>
                                    <div className='border border-gray-300 rounded m-2'>
                                        {oneScheduleItems[date].map((item: ScheduleItem, index: number) => (
                                            <div className='flex justify-center'>
                                                <figure key={index}>
                                                    {item.transportation==""?(<p></p>):(
                                                        <p className='p-1 text-center justify-center m-5'  style={{ fontFamily: 'GmarketSansMedium' }}>-- 이동 방법 --<br/>{item.transportation}</p>
                                                    )}
                                                    {item.distance==0?(<p></p>):(
                                                        <p className='p-1 text-center justify-center m-5'  style={{ fontFamily: 'GmarketSansMedium' }}>-- 이동 거리 --<br/>{item.distance}km</p>
                                                    )}
                                                    {item.duration==0?(<p></p>):(
                                                        <p className='p-1 text-center justify-center m-5'  style={{ fontFamily: 'GmarketSansMedium' }}>-- 걸리는 시간 --<br/>{item.duration}분</p>
                                                    )}
                                                    <p style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='text-center p-1'>&lt;Time: {item.time}&gt;</p>
                                                    <img onClick={() => openImageModal(item.imagePath, item)} src={item.imagePath} className="p-1"/>
                                                    <figcaption style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}className='text-center p-1'>
                                                        {item.name}
                                                    </figcaption>
                                                </figure>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <ImageModal
                            isOpen={isImageModalOpen}
                            onClose={closeImageModal}
                            imagePath={selectedImage}
                            imageName={selectedImageInfo?.name || ''}
                            description={selectedImageInfo?.description || ''}
                            recommendPlace={selectedImageInfo?.recommendPlace || ''}
                        />
                    </div>
                ):(<h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로딩중..</h1>)}
            </div>


        </div>
    )
}
export default SchedulerResult;
