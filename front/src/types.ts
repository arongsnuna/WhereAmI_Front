declare global {
    interface Window {
        kakao: any;
        }
    }

    declare const kakao: any;
    
    export interface MapContainerProps {
        name: string;
        address: string;
        landmark: any; 
    }
    
    export interface Kakao {
        maps: {
        LatLng: any; 
        Map: any; 
        services: {
            Geocoder: any; 
            Status: any; 
            GeocoderResult: any; 
        }
    }
    }

    export interface GeocoderResult {
        address: string;
        x: number;
        y: number;
    }

    export interface Landmark {
        name: string;
        imagePath: string;
        address: string;
    }
    
    export interface APIResponse {
        landmark: Landmark;
        nearByLandmarks: Landmark[];
    }