export interface Bookmark{
    landmarkName:string;
    counts:number;
}
export interface User{
    userName:string;
    profilePath:string;
    description:string;
    bookmarkCounts: Bookmark[];
}
