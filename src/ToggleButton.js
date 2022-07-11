import React from 'react'
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import useDarkMode from './useDarkMode'

const ToggleButton = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()

  return (
    <div className='ml-6 pt-3 flex items-center'>
      <div className="brand text-2xl text-white font-semibold mr-3">Simple Caculator</div>
      <div className=''>
        {isDarkMode ? (
          <BsFillSunFill size={"24px"} color="#e9c46a" className="cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)} />
        ) : (
          <BsFillMoonStarsFill size={"24px"} color="#e9c46a" className="cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)} />
        )}
        {/* <BsFillSunFill size={"24px"} color='#e9c46a' className='cursor-pointer' onClick={() => { toggleDarkMode(!isDarkMode) }} /> */}
      </div>
    </div>
  )
}

export default ToggleButton