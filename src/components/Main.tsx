import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';

interface IProps {
    google: any;
}

export class Map extends React.Component<IProps> {
    render() {
        return (
            <div className='w-full h-full'>
                <GoogleMap
                google={this.props.google}
                zoom={14}
                initialCenter={{ lat: 39.648209, lng: -75.711185 }}
                />
            </div>
        );
    }
}

// Api 호출되는지 확인
const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

console.log(import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY);

if (!apiKey) {
    throw new Error("REACT_APP_GOOGLE_MAPS_API_KEY가 .env에 정의되지 않았습니다");
}

export default GoogleApiWrapper({
    apiKey
})(Map);
