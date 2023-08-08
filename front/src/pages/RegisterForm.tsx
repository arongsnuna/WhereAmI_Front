import { useState } from 'react';
import "../global.css";
import wherelogo from '../assets/where.png';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/index';

interface UserData {
  email: string;
  password: string;
  userName: string;
}

interface RegisterResponse {
  message: string;
}

const registerUser = async (userData: UserData): Promise<RegisterResponse> => {
  try {
    const response = await postData<RegisterResponse>('/users/new', userData);
    return response;
  } catch (err) {
    console.log(err, "error");
    throw new Error('회원가입 실패');
  }
};

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const mutation = useMutation<RegisterResponse, Error, UserData>(registerUser, {
    onSuccess: (data) => { 
      console.log(data);
      const { message } = data; 
      if (message) {
        enqueueSnackbar(message, { variant: 'success' });
        navigate('/LoginForm');
      }
    },
    onError: (err: { message?: string }) => {
      enqueueSnackbar(err.message || "An error occurred", { variant: 'error' });
    },
  });
      
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
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
            <p>이미 회원이신가요?</p>
            <button className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400" 
              onClick = {() => navigate('/loginform')}>
              로그인하기
            </button>
          </div>
        </div>
      </>
  );
}

export default RegisterForm;
