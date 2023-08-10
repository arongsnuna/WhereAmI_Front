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

export interface MyUser{
    id:string;
    userName:string;
    email:string;
    profilePath:string;
    createdAt:string;
    description:string;
}
