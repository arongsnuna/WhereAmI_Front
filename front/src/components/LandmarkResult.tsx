import MapContainer from '../components/MapContainer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as api from '../api/index';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/Context';


interface Landmark {
  name: string;
  address: string;
  imagePath: string;
  id: number;
}
interface LandmarkResultProps {
  landmark: Landmark;
  nearByLandmarks: Landmark[];
}

const LandmarkResult: React.FC<LandmarkResultProps> = ({ landmark, nearByLandmarks }) => {
  const { userState, dispatch, login } = useContext(UserContext);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

  async function checkIsClicked(landmarkId: number) {
    try {
      await api.getData(`/bookmarks/${landmarkId}`);
      await setIsBookmarkClicked(true);
    } catch (error) {
      setIsBookmarkClicked(false);
    }
  }

  async function handleBookmark(landmarkId: number){
    await console.log('1111',landmarkId);
    await api.postWithAuth('/bookmarks/toggle',{landmarkId});
    await checkIsClicked(landmarkId);
  }
  const afterLogin=async () => {
    alert('로그인 후 이용해주세요.');
  }

  const settings = {
    dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
    infinite: false, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
    speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
    slidesToShow: 2, // 화면에 보여질 슬라이드 수
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

  return (
    <div>
      <div className="flex flex-col md:flex-row" style={{fontFamily:'GmarketSansMedium'}}>
        <div className="w-full border border-gray-200 rounded m-2 items-center justify-center ">
          <div className='m-4'>
            <img  src={landmark.imagePath} alt={landmark.name} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="ml-4 text-left sm:text-xl">{landmark.name}</p>
              <p className="ml-4 text-left mb-2 text-xs sm:text-l">{landmark.address}</p>
            </div>
            {!userState.accessToken?(
              <button className="mr-4" onClick={()=>afterLogin()}>♡</button>
            ):(
              <>
                {isBookmarkClicked?(
                  <button className="mr-4" onClick={() => handleBookmark(landmark.id)}>♥</button>
                ):(
                  <button className="mr-4" onClick={() => handleBookmark(landmark.id)}>♡</button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded flex m-2 items-center justify-center ">
          <MapContainer name={landmark.name} address={landmark.address} />
        </div>
      </div>
      <p className='text-3xl ml-3 mt-3' style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>주변에는?</p>
      <Slider {...settings}>
        {nearByLandmarks.map((land) => (
          <div>
            <div className="w-9/10 border border-gray-200 rounded m-2 justify-center">
              <div className='m-4'>
                <img  src={land.imagePath} alt={land.name} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p style={{fontFamily:'GmarketSansMedium'}} className="ml-4 text-left text-l sm:text-xl">{land.name}</p>
                  <p style={{fontFamily:'GmarketSansMedium'}} className="ml-4 text-left text-xs sm:text-l mb-2">{land.address}</p>
                </div>
                {!userState.accessToken?(
                  <button className="mr-4" onClick={()=>afterLogin()}>♡</button>
                ):(
                  <>
                    {isBookmarkClicked ? (
                     <button className="mr-4" onClick={() => handleBookmark(land.id)}>♥</button>
                    ):(
                      <button className="mr-4" onClick={() => handleBookmark(land.id)}>♡</button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LandmarkResult;
