export interface Landmark {
    name: string;
    address: string;
    imagePath: string;
    id?: number;
    landmarkId?: number;
  }
export interface LandmarkResultProps {
landmark: Landmark;
nearByLandmarks: Landmark[];
}
