import Authheader from '@/components/header/Authheader'
import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Authheader />
      <main className='mt-20'>{children}</main>
    </div>
  );
}

export default AuthLayout