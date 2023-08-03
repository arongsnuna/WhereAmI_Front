import { useState } from 'react'
import "../global.css";
import wherelogo from '../assets/where.png'

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      <a href="./" className="md-8">
        <img src={wherelogo} className="logo w-20 h-27 mt-8 mb-14 mx-auto" alt="Vite logo" />
      </a>
        <div className="text-center md:flex md:flex-col md:items-center md:justify-center">
          <div className="flex flex-col">
            <input
              className="mx-auto my-2 w-full md:w-72 h-12 sm:text-sm rounded-full bg-gray-200	py-4 pl-4 focus:outline-none mb-3"
              name='id'
              type='text'
              id='id'
              placeholder='아이디'
              value={id}
              onChange={(e) => setId(e.target.value)}/>
            <input
              className="mx-auto my-2 w-full md:w-72 h-12 sm:text-sm rounded-full bg-gray-200	py-4 pl-4 focus:outline-none mb-3"
              name='password'
              type='password'
              id='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <button
              className="mx-auto mt-6 mb-4 w-full md:w-72 h-12 text-center rounded-lg bg-white border border-gray-400 text-gray-800">
              로그인
            </button>
          </div>
          {/*<div className="flex flex-row justify-center mt-0 ml-40 mb-3">
            <div className="text-xs"> 아이디 </div>
            <div className='mt-0'>  |  </div>
            <div className="text-xs"> 비밀번호 찾기 </div>
  </div>*/}
          <button
              className="mx-auto mt-2 mb-4 w-full md:w-72 h-12 text-center rounded-lg bg-white border border-gray-400 text-gray-800">
              회원가입
            </button>
        </div>
      </div>
    </>

);
}

export default LoginForm
