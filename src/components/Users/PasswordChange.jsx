import React from 'react'

export default function PasswordChange() {
  return (
    <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm  absolute top-0 flex justify-center items-center'>
      <div className='bg-white'>
        <h1>Change Password</h1>
        <form>
          <input type='password' name='password' placeholder='Type password'></input>
          <input type='password' name='confirmPassword' placeholder='Confirm password'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
