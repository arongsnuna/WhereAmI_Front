import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from 'react-query';
import { getData } from '../api/index';

// 랜드마크 이름으로 주소 정보 받기
interface MainProps {
        landmarkName: string;
    }

    const fetchLocationData = async (landmarkName: string) => {
        try {
            const data = await getData(`/api/landmark/${landmarkName}`);
            console.log(data.address);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    
    

    

    const Main: React.FC<MainProps> = ({ landmarkName }) => {
        const { isLoading, error, data } = useQuery(['landmark', landmarkName], () => fetchLocationData(landmarkName));
        const [location, setLocation] = useState({lat: 0, lng: 0});

        //Geocoding API로 주소(String)을 위도, 경도로 바꿔주고 Google Maps에 표시된다
        useEffect(() => {
            if(data) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&key=AIzaSyB-VzBRpDifJBPXugOzXCasJL0qYHLF28k`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                if (data.results[0]) {
                    const newLocation = {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                    };
                    console.log(newLocation);
                    setLocation(newLocation);
                } else {
                    console.error('결과를 찾지 못했습니다');
                }
                })
                .catch(error => console.error(error));
            }
        }, [data]);

        if (isLoading) return 'Loading...';
        if (error) return 'An error has occurred: ' + (error as Error).message;

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