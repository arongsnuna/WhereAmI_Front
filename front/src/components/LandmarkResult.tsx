import React from 'react';
import MapContainer from '../components/MapContainer';
import { Landmark } from '../interface/types';

interface LandmarkResultProps {
  landmark: Landmark;
  nearbyLandmarks: Landmark[];
}

const LandmarkResult: React.FC<LandmarkResultProps> = ({ landmark, nearbyLandmarks }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-4">
        <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden">
          <div>
            <img src={landmark.imagePath} alt={landmark.name} style={{ width: '100%', maxWidth: '640px', height: 'auto' }} />
          </div>
          <h2 className="w-full text-center">{landmark.name}</h2>
          <p className="w-full text-center">{landmark.address}</p>
        </div>
        <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden mt-4 md:mt-0">
          <MapContainer name={landmark.name} address={landmark.address} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {nearbyLandmarks.map((land) => (
          <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden" key={land.id}>
            <div className="w-full h-2/3">
              <img src={land.imagePath} alt="sample" style={{ width: '100%', height: 'auto' }} />
            </div>
            <h2>{land.name}</h2>
            <p>{land.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandmarkResult;
