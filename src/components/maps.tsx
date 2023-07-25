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

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);