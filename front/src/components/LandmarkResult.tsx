import MapContainer from "../components/MapContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as api from "../api/index";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Context";
import { useQuery } from "react-query";
import { Landmark, LandmarkResultProps } from "../interface/landmark";
import { Bookmark } from "../interface/bookmark";

const LandmarkResult: React.FC<LandmarkResultProps> = ({
  landmark,
  nearByLandmarks,
}) => {
  const { userState } = useContext(UserContext);

  // user의 전체 북마크 모음
  const { data: bookmarkZip } = useQuery(["bookmarkZip", userState.id], () =>
    api.getData<Bookmark>(`/bookmarks`)
  );

  const [landmarkIn, setLandmarkIn] = useState(false);
  const [nearByLandmarksIn, setNearByLandmarksIn] = useState<Boolean[]>([]);

  // bookmarkZip에 변경이 있을 때마다 landmark와 nearByLandmarks의 상태를 확인합니다.
  useEffect(() => {
    let isLandmarkIn = false;
    if (bookmarkZip) {
      isLandmarkIn = !!Object.values(bookmarkZip).find(
        (item: Landmark) => item.landmarkId === landmark.id
      );
    }

    const nearbyStatus = nearByLandmarks.map((landmark) => {
      if (bookmarkZip) {
        return !!Object.values(bookmarkZip).find(
          (item: Landmark) => item.landmarkId === landmark.id
        );
      }
      return false;
    });

    setLandmarkIn(isLandmarkIn);
    setNearByLandmarksIn(nearbyStatus);
  }, [bookmarkZip, nearByLandmarks, landmark]);

  const handleBookmark = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    landmarkId: number,
    index?: number
  ) => {
    e.preventDefault();

    // UI를 먼저 업데이트 (옵티미스틱 업데이트)
    if (typeof index !== "undefined") {
      setNearByLandmarksIn((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    } else {
      setLandmarkIn((prev) => !prev);
    }

    try {
      await api.postWithAuth("/bookmarks/toggle", { landmarkId: landmarkId });
    } catch (err) {
      // 실패 시 원래 상태로 되돌림
      if (typeof index !== "undefined") {
        setNearByLandmarksIn((prev) => {
          const updated = [...prev];
          updated[index] = !updated[index];
          return updated;
        });
      } else {
        setLandmarkIn((prev) => !prev);
      }
      console.log(err);
      alert("북마크 업데이트에 실패하였습니다.");
    }
  };

  // const handleBookmark = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   landmarkId: number
  // ) => {
  //   e.preventDefault();
  //   try {
  //     await api.postWithAuth("/bookmarks/toggle", { landmarkId: landmarkId });
  //   } catch (err) {
  //     console.log(err);
  //     alert(err);
  //   }
  // };

  const afterLogin = () => {
    alert("로그인 후 이용해주세요.");
  };

  const settings = {
    dots: true, // 아래에 점 표시 (true: 표시, false: 숨김)
    infinite: false, // 무한 반복 (true: 무한 반복, false: 끝에 도달하면 정지)
    speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
    slidesToShow: 2, // 화면에 보여질 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    arrow: null, // 이전 화살표를 숨김
    draggable: true, //드래그 가능 여부
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 768, //화면 사이즈 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div
        className="flex flex-col md:flex-row"
        style={{ fontFamily: "GmarketSansMedium" }}
      >
        <div className="w-full border border-gray-200 rounded m-2 items-center justify-center ">
          <div className="m-4">
            <img src={landmark.imagePath} alt={landmark.name} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="ml-4 text-left sm:text-xl">{landmark.name}</p>
              <p className="ml-4 text-left mb-2 text-xs sm:text-l">
                {landmark.address}
              </p>
            </div>
            {!userState.accessToken ? (
              <button className="mr-4" onClick={() => afterLogin()}>
                ♡
              </button>
            ) : (
              <>
                {landmarkIn ? (
                  <button
                    className="mr-4"
                    onClick={(e) => handleBookmark(e, landmark.id)}
                  >
                    ♥
                  </button>
                ) : (
                  <button
                    className="mr-4"
                    onClick={(e) => handleBookmark(e, landmark.id)}
                  >
                    ♡
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded flex m-2 items-center justify-center ">
          <MapContainer name={landmark.name} address={landmark.address} />
        </div>
      </div>
      <p
        className="text-3xl ml-5 mt-3"
        style={{ fontFamily: "GangwonEduPowerExtraBoldA" }}
      >
        주변에는?
      </p>
      <Slider {...settings}>
        {nearByLandmarks.map((land, index) => (
          <div>
            <div className="w-9/10 border border-gray-200 rounded m-2 justify-center">
              <div className="m-4">
                <img src={land.imagePath} alt={land.name} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p
                    style={{ fontFamily: "GmarketSansMedium" }}
                    className="ml-4 text-left text-l sm:text-xl"
                  >
                    {land.name}
                  </p>
                  <p
                    style={{ fontFamily: "GmarketSansMedium" }}
                    className="ml-4 text-left text-xs sm:text-l mb-2"
                  >
                    {land.address}
                  </p>
                </div>
                {!userState.accessToken ? (
                  <button className="mr-4" onClick={() => afterLogin()}>
                    ♡
                  </button>
                ) : (
                  <>
                    {nearByLandmarksIn[index] ? (
                      <button
                        className="mr-4"
                        onClick={(e) => handleBookmark(e, land.id, index)}
                      >
                        {" "}
                        ♥{" "}
                      </button>
                    ) : (
                      <button
                        className="mr-4"
                        onClick={(e) => handleBookmark(e, land.id, index)}
                      >
                        {" "}
                        ♡{" "}
                      </button>
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
