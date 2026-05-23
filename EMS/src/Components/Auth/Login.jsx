import React, { useState } from 'react'

const Login = ({handleLogin}) => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
handleLogin(email, password);
setEmail('')
setPassword('')
    };
  return (
  <>
  <div className=' h-screen w-screen flex items-center justify-center'>
<div className='border-2 p-20 border-emerald-600 rounded-xl'>
    <form onSubmit={(e)=>{
       
        submitHandler(e)

    }}
     className='flex flex-col items-center justify-center' action="">
        <input  value={email}
        onChange={(e)=>{
           setEmail(e.target.value)
        }}
        required className=' text-white border-2 border-emerald-600 rounded-full py-2 px-5 text-lg outline-none bg-transparent placeholder:text-grey-00' type="email"  placeholder='Enter your email'/>
        <input 
        value={password}
        onChange={(e)=>{
           setPassword(e.target.value)
        
        }}
         required className='text-white border-2 border-emerald-600 rounded-full py-2 px-5 text-lg outline-none bg-transparent mt-3 placeholder:text-grey-00' type="password"  placeholder='Enter password'/>
        <button className=' w-full text-white border-none bg-emerald-600 rounded-full py-2 px-5 text-xl outline-none  mt-5 '>Log in</button>
    </form>

</div> 
  </div>
  </>
  ) 
}

export default Login