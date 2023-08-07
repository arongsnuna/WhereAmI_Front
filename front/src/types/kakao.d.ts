declare namespace kakao {
    namespace maps {
        class Map {
            constructor(container: HTMLElement, options: any);
            setCenter(coords: LatLng): void;
        }

        class LatLng {
            constructor(y: number, x: number);
        }

        class Marker {
            constructor(options: { map: Map; position: LatLng });
        }

        class InfoWindow {
            constructor(options: { content: string });
            open(map: Map, marker: Marker): void;
        }

        namespace services {
            class Geocoder {
                addressSearch(address: string, callback: (result: GeocoderResult[], status: Status) => void): void;
            }

            interface GeocoderResult {
                y: number;
                x: number;
            }

            enum Status {
                OK,
            }
        }
    }
}
