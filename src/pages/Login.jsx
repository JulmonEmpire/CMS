
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUserAlt } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../components/Utils/firebase';


export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const result = await signInWithEmailAndPassword(auth, data.email, data.password)
      return {email:result.user.email,uid:result.user.uid};
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['user'], data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home/dashboard");
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const loginFormHandler = (e) => {
    e.preventDefault();
    let data = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    }
    loginMutation.mutate(data);
  }


  return (
    <div style={{ backgroundImage: "linear-gradient(to right, #6C526F , #AE89A5)" }} className='h-screen w-screen flex justify-center items-center'>
      <div className="px-6 py-3 rounded min-w-[300px] shadow-lg w-[21.216vw] bg-white">
        <div className="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
          <h2 className="text-[clamp(32px,1.978vw,81px)] font-bold bg-[#6C526F] rounded-full"><FaUserAlt className='text-white m-4' /></h2>
        </div>
        <form ref={formRef} onSubmit={loginFormHandler}>
          {/* <!-- username --> */}
          <div className="flex flex-col my-2">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#595659] ">email</label>
            <input name="email" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>
          <div className="flex flex-col mt-10">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#595659]">Password</label>
            <input name="password" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>
          <div className="flex flex-col items-center justify-center my-3">
            {/* <div className="flex w-full items-center justify-between text-xs text-gray-500">
              <label className="flex items-center justify-center text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold"><input onChange={(e) => setRememberMe(!rememberMe)} type={"checkbox"} /> Remember me.</label>
              <Link to="findUser">
                <p className="text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold">Forgot password?</p>
              </Link>
            </div> */}
            {/* {loginMutation.isLoading === false && */}
            <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] hover:bg-[#fff] hover:text-[#6C526F] hover:border-2 hover:border-[#6C526F] text-[clamp(14px,0.801vw,32.82px)] bg-[#6C526F] text-white uppercase font-bold`}>
              Login
            </button>
            {/*  } */}
            {/* {loginMutation.isLoading &&
              <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
                <img className='w-[20px] m-auto' src='/WhiteLoading.svg' />
              </button>
            } */}
            <Link to={"/signup"}>
              <button className="mb-[4.443vh] hover:bg-[#6C526F] hover:text-white min-w-[150px] min-h-[30px] h-[4.3518518518519vh] my-1 rounded-full py-1 w-[11.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-white border-2 border-[#6C526F] text-[#6C526F] font-bold uppercase">
                Signup
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}