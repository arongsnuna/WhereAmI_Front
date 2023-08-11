export interface Bookmark{
    id:number;
    userId:string;
    landmarkId:number;
    siDo:string;
    imagePath:string;
    name:string;
    address:string;
    createdAt:string;
}
export interface BookmarkZip{
    siDo:string;
    bookmarks:Bookmark[]
}
