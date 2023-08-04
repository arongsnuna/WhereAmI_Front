import React, { useState, useEffect } from 'react';
import * as api from '../api/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useAuth} from '../context/AuthContext';
import {User} from '../interface/user';

const Bookmarks=()=>{
    const {authState} =useAuth();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(()=>{
        const fetchCurrentUser = async () => {
            const user= await api.getData(`/user/${authState.id}`)
            setCurrentUser(user);
        };
        fetchCurrentUser();
    },[]);

    const bookmarks=async () => {
        try{
            const response = await api.getData(`/bookmarks/user/${authState.id}`);
            return response;
        }
        catch(error){
            console.log(error);
            alert(error);
        }
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
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" >
                            로그아웃
                        </button>
                </div>
            </div>
            <div>
                <Slider {...settings}>
                    <div></div>
                </Slider>
            </div>

        </div>
    )

}
export default Bookmarks;
