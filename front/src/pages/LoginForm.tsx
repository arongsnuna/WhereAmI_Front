import { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../api/index';
import "../global.css";
import wherelogo from '../assets/where.png';
import {UserContext} from '../context/Context';
import {useNavigate } from 'react-router-dom';

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const loginMutation = useMutation(async () => {
    const response = await postData('/users/login', { userName, password });
    const { id, accessToken } = response as { id: string; accessToken: string };

    dispatch({ type: 'LOGIN_SUCCESS', payload: {id, accessToken} });
    navigate('/');
    return { accessToken };
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <>
    {loginMutation.isError ? <p>로그인 정보를 찾을수가 없습니다</p> : null}
        <a href="./" className="items-center md-8">
          <img src={wherelogo} className="logo w-23 h-32 mt-8 mb-12 mx-auto" alt="Vite logo" />
        </a>
        <div className='flex flex-col md:flex-row md:items-center md:justify-center'>
        <div style={{ fontFamily: 'GmarketSansMedium' }} className="text-center md:flex md:flex-col md:items-center md:justify-center ">
          <div className="flex flex-col">
            <input
              className="mx-auto my-2 w-60 md:w-72 lg:w-96 h-12 sm:text-sm rounded-full bg-cyan-100 py-4 pl-4 focus:outline-none mb-3 "
              name='id'
              type='text'
              id='id'
              placeholder='아이디'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}/>
            <input
              className="mx-auto my-2 w-60 md:w-72 lg:w-96 h-12 sm:text-sm rounded-full bg-cyan-100 py-4 pl-4 focus:outline-none mb-3"
              name='password'
              type='password'
              id='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <button
              className="mx-auto mt-2 mb-4 w-60 md:w-72 lg:w-96 h-12 text-center rounded-lg bg-white border-2 border-cyan-200 text-gray-800"
              onClick={handleSubmit}
              disabled={loginMutation.isLoading}>
              {loginMutation.isLoading ? 'Logging in...' : '로그인'}
            </button>
          </div>
              <button className="mx-auto mt-2 mb-4 w-60 md:w-72 lg:w-96 h-12 text-center rounded-lg bg-white border-2 border-cyan-200 text-gray-800" onClick = {() => navigate('/registerform')}>회원가입</button>
          </div>
        </div>
    </>
  );
}

export default LoginForm;
