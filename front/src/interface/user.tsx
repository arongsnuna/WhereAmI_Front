
export interface User{
    userName:string;
    password:string;
    profilePath:string;
    description:string;
    bookmarkCounts: {
        [location:string]:{
            imagePath:string;
            count:number;
        }
    };
}
