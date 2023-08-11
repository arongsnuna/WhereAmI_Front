import { useState, useEffect, useContext } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BookmarkZip} from '../interface/bookmark';
import { Button} from 'antd';


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
    console.log('bookmarkZip',bookmarkZip)
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

    // 이미지 클릭했을때 북마크 디테일로 이동
    const navigateBookmarksDetail = (landmarkName:string)=>{
        navigate(`/BookmarksDetail/${landmarkName}`)
    }

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
                            <div className="w-9/10 border border-light-blue-200 rounded m-10 justify-center text-bold" key={item.siDo}>
                                <h2 style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} className='m-3'>{item.siDo}</h2>
                                <div className="h-[480px] overflow-hidden">
                                    <Slider {...settings}>
                                        {item.bookmarks.map((bookmark: any, imgIndex: number) => (
                                            <figure className="flex justify-center p-3" key={imgIndex}>
                                                <img src={bookmark.imagePath}
                                                className="w-full h-96 object-cover"
                                                onClick={() => navigateBookmarksDetail(bookmark.name)}/>
                                                <figcaption className="truncate w-full text-center m-1" style={{ fontFamily: 'GmarketSansMedium' }}>
                                                    {bookmark.name}
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        ))
                    ):( <h1 style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} className='mt-8 mb-1 ml-3 text-center'>로딩중..</h1>)
                    }
                    {bookmarkZip &&  Object.keys(bookmarkZip).length>0 ?(
                        <div className='flex justify-center items-center'>
                            <Button
                                onClick={navigateMakeSchedule}
                                className="mt-5 border border-blue-200 text-2x1 px-8 text-bold"
                                size="large"
                            >
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
