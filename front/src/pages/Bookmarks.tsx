import { useState, useEffect, useContext } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BookmarkZip } from '../interface/bookmark';
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
            {bookmarkZip &&  Object.keys(bookmarkZip).length>0 ?(
                bookmarkZip.map((item:any)=>(
                    <div className="w-9/10 border border-gray-200 rounded m-2 justify-center text-bold" key={item.siDo}>
                        <h2 style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} className='m-3'>{item.siDo}</h2>
                        <div>
                            <Slider {...settings}>
                                {item.bookmarks.map((bookmark: any, imgIndex: number) => (
                                    <figure className="flex justify-center p-2" key={imgIndex}>
                                        <img src={bookmark.imagePath}/>
                                        <figcaption style={{ fontFamily: 'GmarketSansMedium' }} className='text-center m-1'>
                                            {bookmark.name}
                                        </figcaption>
                                    </figure>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ))
            ):(<h1>로딩 중..</h1>)
            }
             <div className='flex justify-center items-center'>
                <Button onClick={navigateMakeSchedule} className="mt-5">
                    일정 만들러가기
                </Button>
            </div>

        </div>
    )

}
export default Bookmarks;
