import {MyUser} from '../interface/user';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useQuery } from 'react-query';
//import userSample from '../assets/userSample.png';

const UpdateMyPage = () =>{
    const { userState, dispatch} = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState<MyUser>();

    const { data:userData, isLoading:isUserDataLoading} = useQuery(['user'], () =>
        api.getData<MyUser>(`/user/my/current`)
    );
    const [myUserName, setMyUserName] = useState('');
    const [myDescription, setMyDescription] = useState('');
    //const [myProfilePath, setMyProfilePath] = useState(profilePath);
    //const [previewPhoto, setPreviewPhoto] = useState(userSample);
    console.log(currentUser);

    useEffect(()=>{
        if(!isUserDataLoading&&userData){
            setCurrentUser(userData);
            setMyUserName(userData.userName);
            setMyDescription(userData.description);
        }
    }, [userData,isUserDataLoading])

    // const fileInputRef = React.useRef<HTMLInputElement>(null);
    // const config = {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // };

    //  // 이미지 수정
    //  const handleImageUpload = async (file: File) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         await api.postData('/user/Image', formData, config);
    //     } catch (err) {
    //         console.log(err);
    //         alert(err);
    //     }
    // };
    // const handleButtonClick = async()=>{
    //     if(fileInputRef.current && fileInputRef.current.files?.[0]){
    //         const file = fileInputRef.current.files[0];
    //         await handleImageUpload(file);
    //     }
    // }

    // const saveImgFile = (e) => {
    //     setMyProfilePath(e.target.files[0])
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     console.log('reader',reader);
    //     reader.onloadend = () => {
    //       setPreviewPhoto(reader.result);
    //     };
    // };

    const updateUserInfo = async () => {
        try{
            const formData = new FormData();
            formData.append('userName',myUserName);
            formData.append('description',myDescription);
            console.log('formData', formData);
            await api.patchData(`/users/${userState.id}`, formData);
        }
        catch(err){
            console.log(err);
        }
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        if (userState.accessToken) {
            dispatch({ type: 'LOGOUT' });
        } else {
            navigate('/loginform');
        }
    };
    const navigateHome= ()=>{
        navigate('/');
    }

    const buttonText = userState.accessToken ? '로그아웃' : '로그인';
    return(
        <div>
            <div className='flex'>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                        <button className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                            {buttonText}
                        </button>
                </div>
            </div>
            {userState.accessToken?(
                <>
                {/* <div onSubmit={handleButtonClick}>
                    <div>
                        <img src = {previewPhoto}/>
                    </div>
                    <div>
                        <label>Upload Photo</label>
                        <input
                            type="file" accept='image/*'
                            ref={fileInputRef}
                            onChange={saveImgFile}
                        />
                    </div>
                    <button type="submit">이미지 업로드</button>
                </div> */}
                <div>
                    <form >
                            UserName:
                            <input type="text" placeholder={myUserName} value={myUserName} onChange={e => setMyUserName(e.target.value)} />
                            Description:
                            <input type="text" placeholder={myDescription} value={myDescription} onChange={e => setMyDescription(e.target.value)} />
                        <button onClick={()=>updateUserInfo()}>저장</button>
                    </form>
                </div>
                </>
            ):(
                <h1 className='text-center mt-10'>로그인 후 이용해주세요.</h1>
            )}
        </div>
    )
}
export default UpdateMyPage;
