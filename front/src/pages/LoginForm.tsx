import { useState } from 'react'
import "../global.css";
import wherelogo from '../../public/images/where.png'

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
              name='id'
              type='text'
              id='id'
              placeholder='아이디'
              value={id}
              onChange={(e) => setId(e.target.value)}/>
            <input
              className="mx-auto my-1 w-auto md:w-60 text-center rounded-lg bg-slate-200"
              name='password'
              type='password'
              id='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <button
              className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400" >
              로그인
            </button>
          </div>
          <div className="flex flex-row justify-center md:mt-3">
            <div> 아이디 찾기 </div>
            <div className='mx-2'>  |  </div>
            <div> 비밀번호 찾기 </div>
            <div className='mx-2'>  |  </div>
            <div> 회원가입 </div>
          </div>
        </div>
      </div>
    </>

);
}

export default LoginForm
