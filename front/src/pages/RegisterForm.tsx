import { useState, useContext, useEffect } from 'react';
import "../global.css";
import wherelogo from '../assets/where.png';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { postData as POST} from '../api/index';

const registerUser = async (userData) => {
    const response = await POST('/users/new', userData);
    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      return data;
    }
    throw new Error('회원가입 실패');
  };

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  //이메일 형식 확인하기 example @ example.com
  const validateEmail = (emailAddress) =>
      emailAddress
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    
  

    const mutation = useMutation(registerUser, {
      onSuccess: async (data) => {
        const { token, message } = data;
        if (token) {
          sessionStorage.setItem('userToken', token);
          enqueueSnackbar('회원가입 성공', { variant: 'success' });
          navigate('/LoginForm');
        } else if (message) {
          enqueueSnackbar(message, { variant: 'success' });
          navigate('/LoginForm');
        }
      },
      onError: (err) => {
        enqueueSnackbar(`${err.message}`, { variant: 'error' });
      },
  });
      
  const handleSubmit = (e) => {
      e.preventDefault();
  
      const isEmailValid = validateEmail(email);
      const isPasswordValid = password.length >= 8;
  
      if (password !== confirmPassword) {
        enqueueSnackbar('Passwords do not match', { variant: 'error' });
        return;
      }
  
      if (!isEmailValid || !isPasswordValid) {
        enqueueSnackbar('Invalid inputs', { variant: 'error' });
        return;
      }
  
      mutation.mutate({ email, password, userName });
    };
  

    return (
      <>
        <div className='flex flex-col md:flex-row md:items-center md:justify-center'>
          <a href="./" className="items-center">
            <img src={wherelogo} className="logo sm:mx-auto" alt="Vite logo" />
          </a>
          <div className="text-center md:flex md:flex-col md:items-center md:justify-center">
            <div className="flex flex-col">
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                type="text"
                id="email"
                name="email"
                placeholder='이메일'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                type='text'
                name='id'
                id='id'
                placeholder='아이디'
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}/>
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                name='password'
                type='password'
                id='password'
                placeholder='비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              <input
                className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder='비밀번호 확인'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}/>
              <button
                className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400" 
                onClick={handleSubmit}>
                회원가입
              </button>
            </div>
            <div className="flex flex-row justify-center md:mt-3">
              <p>이미 회원이신가요? 로그인 </p>
            </div>
          </div>
        </div>
      </>
  );
}

export default RegisterForm;
