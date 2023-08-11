import {MyUser} from '../interface/user';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useQuery, useMutation, useQueryClient } from 'react-query';
//import userSample from '../assets/userSample.png';

const UpdateMyPage = () =>{
    const { userState, dispatch} = useContext(UserContext);
    // const [currentUser, setCurrentUser] = useState<MyUser>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: userData, isLoading: isUserDataLoading } = useQuery(['user'], () =>
        api.getData<MyUser>(`/user/my/current`)
    );
    const [myEmail, setMyEmail] = useState('');
    const [myDescription, setMyDescription] = useState('');
    //const [myProfilePath, setMyProfilePath] = useState(profilePath);
    //const [previewPhoto, setPreviewPhoto] = useState(userSample);
    // console.log(currentUser);

    
    useEffect(()=>{
        if(!isUserDataLoading&&userData){
            // setCurrentUser(userData);
            setMyEmail(userData.email);
            setMyDescription(userData.description);
        }
    }, [userData,isUserDataLoading]);

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

    // const updateUserInfo = async () => {
    //     try{
    //         const formData = new FormData();
    //         formData.append('userName',myUserName);
    //         formData.append('description',myDescription);
    //         console.log('formData', formData);
    //         await api.patchData(`/users/${userState.id}`, formData);
    //     } catch (err) {
    //         console.log(err);
    //         alert('Error updating user.');
    //     }
    // };
    function isValidEmail(email: string): boolean {
        // Basic regex for email validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
    

    const updateUserInfo = () => {
        if (!isValidEmail(myEmail)) {
            alert('올바른 이메일 형식을 사용해주세요.');
            return;
        }
        const data = {
            email: myEmail,
            description: myDescription
        };
        userUpdateMutation.mutate(data);
    };
    
    const userUpdateMutation = useMutation((data: {email: string, description: string}) => api.patchData<MyUser>(`/user/${userState.id}`, data), {
        onSuccess: () => {
            alert('유저 정보 성공적으로 업데이트되었습니다');
            navigate('/MyPage');
            queryClient.invalidateQueries(['user', userState.id]);
        },
        onError: (error: any) => {
            console.error('Response:', error.response);
            alert('유저 정보 업데이트 실패.');
            console.error(error.message);
        }
    });

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
            <div className='flex '>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                        <button className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                            {buttonText}
                        </button>
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-center"> 
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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-center">
                        <div className="text-center md:flex md:flex-col md:items-center md:justify-center">
                            <div className="flex flex-col">
                                <form onSubmit={e => { e.preventDefault(); updateUserInfo(); }}>
                                    <div className="mb-4">
                                        <p style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>이메일 바꾸기</p>
                                        <input
                                            className="mx-auto my-2 w-60 md:w-72 lg:w-96 h-12 sm:text-sm rounded-full bg-cyan-100 py-4 pl-4 focus:outline-none mb-3"
                                            type="text"
                                            placeholder={myEmail}
                                            value={myEmail}
                                            onChange={e => setMyEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <p style={{fontFamily: 'GangwonEduPowerExtraBoldA'}}>자기소개 바꾸기</p>
                                    <input
                                        className="mx-auto my-2 w-60 md:w-72 lg:w-96 h-12 sm:text-sm rounded-full bg-cyan-100 py-4 pl-4 focus:outline-none mb-3"
                                        type="text"
                                        placeholder={myDescription}
                                        value={myDescription}
                                        onChange={e => setMyDescription(e.target.value)} />
                                    </div>
                                    <button className="mx-auto mt-2 mb-4 w-60 md:w-72 lg:w-96 h-12 text-center rounded-lg bg-white border-2 border-cyan-200 text-gray-800" type="submit">
                                        저장
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </>
        ) : (
            <h1 className='text-center mt-10'>로그인 후 이용해주세요.</h1>
        )}
        </div>
    </div>
    )
}
export default UpdateMyPage;
