import { useState } from 'react'
import "./global.css";


function RegisterForm() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className='flex flex-col'>
        <h1 className="text-center m-10">여긴 어디?</h1>
        <input 
          className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
          type="email" 
          id="email" 
          name="email" 
          placeholder='이메일' 
          value={email}  
          onChange={(e) => setEmail(e.target.value)}/>

        <input 
          className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
          type='text' 
          name='id' 
          id='id' 
          placeholder='아이디'
          value={id}
          onChange={(e)=>setId(e.target.value)}/>

        <input 
          className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
          type='password' 
          name='password' 
          id='password' 
          placeholder='비밀번호'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
        
        <input 
          className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
          type="password" 
          name="confirmPassword"
          id="confirmPassword"  
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <button 
                    className="mx-auto mt-3 mb-3 w-40 text-center rounded-lg bg-slate-400" >회원가입
        </button>
        <div className="mr-5 text-right">
          <p>이미 회원이신가요? 로그인하러가기 </p>
        </div>
      </div>
    </>
);
}

export default RegisterForm
