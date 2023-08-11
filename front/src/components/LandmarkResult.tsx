import MapContainer from '../components/MapContainer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as api from '../api/index';
import React, { useContext,  useState, useEffect } from 'react';
import { UserContext } from '../context/Context';
import { useQuery} from 'react-query';
import {Landmark, LandmarkResultProps} from '../interface/landmark';
import { Bookmark } from '../interface/bookmark';


const LandmarkResult: React.FC<LandmarkResultProps> = ({ landmark, nearByLandmarks }) => {
  // 로그인된 user 확인
  const { userState} = useContext(UserContext);

  //user의 전체 북마크 모음
  const [bookmarkZip, setBookmarkZip] = useState<Bookmark>();
  const { data: bookmarkZipData, isLoading: isBookmarkZipLoading } = useQuery(['bookmarkZip', userState.id], () =>
    api.getData<Bookmark>(`/bookmarks`)
  );
  useEffect(() => {
    async function fetchData() {
      if (!isBookmarkZipLoading&& bookmarkZipData) {
        setBookmarkZip(bookmarkZipData);
      }
    }
    fetchData();
  }, [isBookmarkZipLoading, bookmarkZipData, landmark]);

  // bookmarkZip에 lanmark가 있는지 확인 -> landmarkIn
  const [landmarkIn, setLandmarkIn] = useState(false);
  // bookmarkZip에 각각의 nearByLandmarks가 있는지 확인하는 boolean 배열 -> nearByLandmarksIn
  const [nearByLandmarksIn, setNearByLandmarksIn] = useState<Boolean[]>([]);

  useEffect(()=>{
    // nearByLandmarks가 bookmarkZip 에 있는지
    nearByLandmarks.forEach(landmark => {
      isInBookmarkZip(landmark.id);
    })
    // landmark가 bookmarkZip 에 있는지
    if(bookmarkZip != null && Object.values(bookmarkZip).length >0){
      setLandmarkIn(!!Object.values(bookmarkZip).find((item: Landmark)=>item.landmarkId=== landmark.id));
    }
    console.log("뿡스바뤼",landmarkIn,nearByLandmarksIn)
  },[landmark]);
  // 주어진 landmarkId가 bookmarkZip에 있는지 확인
  const isInBookmarkZip = async(landmarkId: number)=>{
    try{
      if(bookmarkZip != null && Object.values(bookmarkZip).length >0){
        if(nearByLandmarksIn.length>5){
          setNearByLandmarksIn([])
        }
        const hasId =!!Object.values(bookmarkZip).find((item: Landmark)=>item.landmarkId=== landmarkId);
        setNearByLandmarksIn(prevItems=>[...prevItems, hasId])
      }
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  const handleBookmark = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>,landmarkId: number)=>{
    e.preventDefault();
    try{
      await api.postWithAuth('/bookmarks/toggle',{landmarkId:landmarkId});
    }
    catch (err) {
      console.log(err)
      alert(err);
    }
  }

  const afterLogin=async () => {
    alert('로그인 후 이용해주세요.');
  }

  const settings = {
    dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
    infinite: false, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
    speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
    slidesToShow: 4, // 화면에 보여질 슬라이드 수
    slidesToScroll: 4, // 한 번에 스크롤할 슬라이드 수
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
                {landmarkIn?(
                  <button className="mr-4" onClick={(e) => handleBookmark(e,landmark.id)}>♥</button>
                ):(
                  <button className="mr-4" onClick={(e) => handleBookmark(e,landmark.id)}>♡</button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded flex m-2 items-center justify-center ">
          <MapContainer name={landmark.name} address={landmark.address} />
        </div>
      </div>
      <p className='text-3xl ml-5 mt-3' style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>주변에는?</p>
      <Slider {...settings}>
        {nearByLandmarks.map((land,index) => (
          <div className="w-96 h-96 m-auto"> 
            <div className="w-9/10 border border-gray-200 rounded m-2 flex flex-col justify-center">
              <div className='my-2 overflow-hidden w-30 h-60 w-full'>
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
                    {nearByLandmarksIn[index]?(
                      <button className="mr-2" onClick={(e) => handleBookmark(e, land.id)}> ♥ </button>
                    ):(
                      <button className="mr-2" onClick={(e) => handleBookmark(e, land.id)}> ♡ </button>
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
