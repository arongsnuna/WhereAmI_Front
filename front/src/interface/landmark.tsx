export interface Landmark {
    name: string;
    address: string;
    imagePath: string;
    id?: number;
    landmarkId?: number;
  }
export interface LandmarkResultProps {
landmark: LandmarkSearch;
nearByLandmarks: LandmarkSearch[];
}
export interface LandmarkSearch{
  address:string;
  areaId: number;
  id:number;
  imagePath:string;
  name:string;
}
