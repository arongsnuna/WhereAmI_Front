import { useState } from 'react'
import "./global.css";
import wherelogo from './assets/where.png'

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              value={id}
              onChange={(e)=>setId(e.target.value)}/>
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
              className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400" >
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

export default RegisterForm
