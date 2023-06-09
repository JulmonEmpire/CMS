
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUserAlt } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../components/Utils/firebase';
import PasswordChange from '../components/Users/PasswordChange';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import ForgotPassword from '../components/Users/ForgotPassword';


export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const queryClient = useQueryClient();
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userRef = doc(db, "users", result.user.uid);
      const user = await getDoc(userRef);
      return user.data()
      // return { email: result.user.email, uid: result.user.uid };
    },
    onSuccess: (data) => {
      if (data === undefined) {
        toast.error("Account not found!");
        return
      }
      queryClient.setQueryData(['user'], data);
      localStorage.setItem("user", JSON.stringify(data));
      if (data?.firstPasswordChange === false && data?.role === "Basic User") {
        setShowPasswordChangeModal(true);
        return
      }
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Wrong credentials");
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

  const hideModal = () => {
    setShowPasswordChangeModal(false);
  }

  const hideForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  }


  return (
    <>
      {
        showPasswordChangeModal &&
        <PasswordChange hideModal={hideModal}></PasswordChange>
      }
      {
        showForgotPasswordModal &&
        <ForgotPassword hideForgotPasswordModal={hideForgotPasswordModal}></ForgotPassword>
      }
      <div style={{ backgroundImage: "linear-gradient(to right, #6C526F , #AE89A5)" }} className='h-screen w-screen flex justify-center items-center'>
        <div className="px-6 py-3 rounded min-w-[300px] shadow-lg w-[21.216vw] bg-white">
          <div className="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
            <h2 className="text-[clamp(32px,1.978vw,81px)] font-bold bg-[#6C526F] rounded-full"><FaUserAlt className='text-white m-4' /></h2>
          </div>
          <form ref={formRef} onSubmit={loginFormHandler}>
            <div className="flex flex-col my-2">
              <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#595659] ">Email</label>
              <input name="email" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
            </div>
            <div className="flex flex-col mt-10">
              <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#595659]">Password</label>
              <input name="password" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
            </div>
            <p onClick={() => setShowForgotPasswordModal(true)} className='text-[12px] text-[#595659] hover:text-[#8AB4F8] mt-2 text-right font-bold cursor-pointer transition-colors duration-300'>Forgot Password?</p>
            <div className="flex flex-col items-center justify-center my-2">
              {loginMutation.isLoading === false &&
                <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] hover:bg-[#fff] hover:text-[#6C526F] border-2 border-[#6C526F] text-[clamp(14px,0.801vw,32.82px)] bg-[#6C526F] text-white uppercase font-bold transition-all duration-300`}>
                  Login
                </button>
              }
              {loginMutation.isLoading &&
                <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] hover:bg-[#fff] hover:text-[#6C526F] border-2 border-[#6C526F] text-[clamp(14px,0.801vw,32.82px)] bg-[#6C526F] text-white uppercase font-bold transition-all duration-300`}>
                  <img className='w-[20px] m-auto' src='/Loading.svg' />
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}