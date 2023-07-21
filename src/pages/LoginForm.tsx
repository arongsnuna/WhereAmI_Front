import "../global.css";
import { useState } from 'react'

function LoginForm() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className='h-screen flex flex-col justify-center items-center'>
                <h1 className="text-center m-10">여긴 어디?</h1>

                <input 
                    className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
                    name='id' 
                    type='text' 
                    id='id' 
                    placeholder='아이디' 
                    value={id} 
                    onChange={(e) => setId(e.target.value)}/>
                <input 
                    className="mx-auto my-1 w-80 text-center rounded-lg bg-slate-200" 
                    name='password' 
                    type='password' 
                    id='password' 
                    placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button 
                    className="mx-auto mt-1 mb-3 w-40 text-center rounded-lg bg-slate-400" >로그인
                </button>
                <div className="flex flex-row justify-end">
                    <div> 아이디 찾기 </div>
                    <div className='mr-3 ml-3'>  |  </div>
                    <div className='mr-5'> 비밀번호 찾기 </div>
                </div> 
                <div className="mr-5 text-right">
                    <p>계정이 없으세요? 회원가입하기</p>
                </div>
            </div>
                
        </>
    )
}

export default LoginForm;
