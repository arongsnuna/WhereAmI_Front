export interface LocalLandmark {
    id: number;
    name: string;
    address: string;
    imagePath: string;
    landmarkId: number;
}

export interface LandmarkResultProps {
    landmark: LocalLandmark;
    nearByLandmarks: LocalLandmark[];
    userId?: string | number | null; 
}