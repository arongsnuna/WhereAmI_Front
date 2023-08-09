import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import * as api from '../api/index';
import { UserContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const SchedulerResult=()=> {
    const { userState, dispatch } = useContext(UserContext);
    const [schedule, setSchedule] = useState({});
    const {data, isLoading} = useQuery(['scehduler'],()=>
        api.getData(`/scheduler`)
    );
    useEffect(()=>{
        if(!isLoading&&data){
            setSchedule(data);
        }
    }, [data,isLoading]);

    const buttonText = userState.accessToken ? '로그아웃' : '로그인';
    const navigate = useNavigate();
    const handleLogin = () => {
        console.log(userState);
        if (userState.accessToken) {
            dispatch({ type: 'LOGOUT' });
        } else {
            navigate('/loginform');
        }
    };
    const navigateHome= ()=>{
        navigate('/');
    }

    return(
        <div>
            <div className='flex'>
                <div className='w-1/5'></div>
                <div className='w-3/5 text-center pt-5 text-5xl'style={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={navigateHome}>여긴 어디?</div>
                <div className='w-1/5 flex justify-end pt-5 pr-5'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded my-auto text-xs sm:text-base" onClick={handleLogin}>
                        {buttonText}
                    </button>
                </div>
            </div>
            {schedule && Object.keys(schedule).length>0?(
                <div>
                </div>
            ):(<p></p>)}
        </div>
    )
}
export default SchedulerResult;
