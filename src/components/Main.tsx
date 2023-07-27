import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from 'react-query';
import { getData } from '../api/index';

interface MainProps {
    landmarkName: string;
}

//API 호출 
const fetchLocationData = async (landmarkName: string) => {
    try {
        const data = await getData(`/api/landmark/${landmarkName}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


//랜드마크 이름을 검색해서 주소를 불러오기
const Main: React.FC<MainProps> = ({ landmarkName }) => {
    const { isLoading, error, data } = useQuery(['landmark', landmarkName], () => fetchLocationData(landmarkName));
    const [location, setLocation] = useState({lat: 0, lng: 0});
    const [fetchError, setFetchError] = useState(null);

//Geocoding API를 통해 주소값을 위도, 경도값으로 변환해서 구글맵에서 읽을 수 있게끔ㄴ
    useEffect(() => {
        if(data && data.address) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&key=AIzaSyB-VzBRpDifJBPXugOzXCasJL0qYHLF28k`)
                .then(response => response.json())
                .then(data => {
                    if (data.results[0]) {
                        const newLocation = {
                            lat: data.results[0].geometry.location.lat,
                            lng: data.results[0].geometry.location.lng
                        };
                        setLocation(newLocation);
                    } else {
                        console.error('결과를 찾지 못했습니다');
                    }
                })
                .catch(error => {
                    console.error(error);
                    setFetchError(error);
                });
        }
    }, [data]);

    if (isLoading) return <p>로딩중...</p>;
    if (error) return <p>오류가 발생하였습니다: {error.message}</p>;
    if (fetchError) return <p>Geocoding API 오류: {fetchError.message}</p>;


    //구글맵 표시
    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyB-VzBRpDifJBPXugOzXCasJL0qYHLF28k">
                <GoogleMap
                    mapContainerStyle={{ width: "400px", height: "400px" }}
                    center={location}
                    zoom={10}
                >
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Main;
