import React from 'react'

const Footer = () => {
  return (
    <footer className= 'absolute w-[100vw] bottom-0 text-3xxl bg-violet-950 text-white h-[10vh] flex justify-center items-center'>
        DMusic All Rights Reserved. Copyright {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
