import React from 'react'
import ToggleTheme from "../components/ToggleTheme";


const LandingPage = () => {
  return (
    <>
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <p className="text-2xl text-black dark:text-gray-100 mb-4">
        Welcome to the App !!!
      </p>
      <ToggleTheme/>
    </div>
  </>
  )
}

export default LandingPage
