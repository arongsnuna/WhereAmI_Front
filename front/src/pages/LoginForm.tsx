import { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../api/index';
import "../global.css";
import wherelogo from '../assets/where.png';
import {UserContext} from '../context/Context';
import {useNavigate } from 'react-router-dom';
import { APIResponse }   from '../interface/response';


interface LoginResponse {
  accessToken: string;
}

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const loginMutation = useMutation(async () => {
    const response = await postData<APIResponse<LoginResponse>>('/users/login', { userName, password });
    console.log("Response:", response);

    if (!response.data || !response.data.result || !response.data.result.accessToken) {
      throw new Error("Unexpected API response format");
    }
  
    const { accessToken } = response.data.result;

    dispatch({ type: 'LOGIN_SUCCESS', payload: accessToken }); 
    navigate('/');

    return { accessToken };
});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <>
    {loginMutation.isError ? <p>로그인 정보를 찾을수가 없습니다</p> : null}
      <div className='flex flex-col md:flex-row md:items-center md:justify-center'>
        <a href="./" className="items-center">
          <img src={wherelogo} className="logo sm:mx-auto" alt="Vite logo" />
        </a>
        <div className="text-center md:flex md:flex-col md:items-center md:justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                name='id'
                type='text'
                id='id'
                placeholder='아이디'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}/>
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                name='password'
                type='password'
                id='password'
                placeholder='비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              <button
                type="submit"
                className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400"
                disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'Logging in...' : '로그인'}
              </button>
            </div>
          </form>
          <div className="flex flex-row justify-center md:mt-3">
            <div> 아이디 찾기 </div>
            <div className='mx-2'>  |  </div>
            <div> 비밀번호 찾기 </div>
            <div className='mx-2'>  |  </div>
            <button onClick = {() => navigate('/registerform')}>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
