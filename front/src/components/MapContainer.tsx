import React, { useEffect } from 'react';
import { kakaoResult } from '../interface/kakaoResult';


declare global {
  interface Window {
    kakao: any;
  }
}
// 해당 파일의 가장 위에 추가합니다.
declare const kakao: any;

interface MapContainerProps {
  name: string;
  address: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ name, address }) => {

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 5
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(address, function (result: kakaoResult[], status: kakao.maps.services.Status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log('하하하하',result);
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map, // 여기서 map은 지도 인스턴스가 있어야 합니다.
          position: coords
        });
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;color:black;text-align:center;padding:6px 0;">${name}</div>`
        });
        infowindow.open(map, marker);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div id='myMap' style={{
      width: '100%',
      height: "300px",
    }}></div>
  );
}

export default MapContainer;
