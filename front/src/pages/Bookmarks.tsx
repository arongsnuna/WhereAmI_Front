import { useState, useEffect, useContext } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BookmarkZip, Bookmark } from '../interface/bookmark';
import { Button} from 'antd';
interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    siDo: string;
    imagePath: string;
    name: string;
    address: string;
    landmarkId:number;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, siDo, imagePath, name, address, landmarkId}) => {
    // 북마크 삭제
    const navigate = useNavigate();
    const deleteBookmark = async(landmarkId: number)=>{
        await api.deleteData<Bookmark>(`/bookmarks/${landmarkId}`);
        alert('삭제되었습니다!');
        onClose();
        navigate('/Bookmarks');
    }
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 m-5 rounded-lg shadow-lg border border-gray-100">
                {name &&address?(
                    <div>
                        <div className='flex justify-center'>
                            <img src={imagePath} alt={name} className="w-1/2 h-auto mb-4 rounded items-center" />
                        </div>
                        <h2 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='flex justify-center items-center'>{name}</h2>
                        <br/>
                        {siDo && <p style={{ fontFamily: 'GmarketSansMedium' }}>지역:  {siDo}</p>}
                        <br/>
                        {address && <p style={{ fontFamily: 'GmarketSansMedium' }}>주소: {address}</p>}
                        <br/>
                        <div className="flex justify-center">
                            <button onClick={onClose}style={{ fontFamily: 'GmarketSansMedium' }}
                                className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base m-1">
                                    닫기
                            </button>
                            <button onClick={()=>deleteBookmark(landmarkId)}style={{ fontFamily: 'GmarketSansMedium' }}
                                className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base m-1">
                                    삭제하기
                            </button>
                        </div>
                    </div>
                ):(<h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로딩중..</h1>)}
            </div>
        </div>
    );
};

const Bookmarks=()=>{
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

    const navigateMakeSchedule= () => {
       navigate("/MakeSchedule");
    }
    // 클릭했을때 모달창 뜨도록
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedImageInfo, setSelectedImageInfo] = useState<Bookmark | null>(null);

    const openImageModal = async(imagePath: string, landmarkId: number) => {
        await setIsImageModalOpen(true);
        await setSelectedImage(imagePath);
        const response = await api.getData<Bookmark>(`/bookmarks/${landmarkId}`);
        await setSelectedImageInfo(response);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage('');
        setSelectedImageInfo(null);
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
                    {bookmarkZip &&  Object.keys(bookmarkZip).length>0 ?(
                        bookmarkZip.map((item:any)=>(
                            <div className="w-9/10 border border-gray-200 rounded m-2 justify-center text-bold" key={item.siDo}>
                                <h2 style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} className='m-3'>{item.siDo}</h2>
                                <div>
                                    <Slider {...settings}>
                                        {item.bookmarks.map((bookmark: any, imgIndex: number) => (
                                            <figure className="flex justify-center p-3" key={imgIndex}>
                                                <img src={bookmark.imagePath} onClick={() => openImageModal(bookmark.imagePath, bookmark.landmarkId)}/>
                                                <figcaption style={{ fontFamily: 'GmarketSansMedium' }} className='text-center m-1'>
                                                    {bookmark.name}
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </Slider>
                                </div>
                                <ImageModal
                                    isOpen={isImageModalOpen}
                                    onClose={closeImageModal}
                                    imagePath={selectedImage}
                                    name={selectedImageInfo?.name || ''}
                                    siDo={selectedImageInfo?.siDo|| ''}
                                    address={selectedImageInfo?.address || ''}
                                    landmarkId={selectedImageInfo?.landmarkId||0}
                                />
                            </div>
                        ))
                    ):(<h1 style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} className='mt-8 mb-1 ml-3 text-center'>로딩중..</h1>)
                    }
                    {bookmarkZip &&  Object.keys(bookmarkZip).length>0 ?(
                        <div className='flex justify-center items-center'>
                            <Button onClick={navigateMakeSchedule} className="mt-5">
                                일정 만들러가기
                            </Button>
                        </div>
                    ):(<p></p>)}
                </>
            )}

        </div>
    )

}
export default Bookmarks;
