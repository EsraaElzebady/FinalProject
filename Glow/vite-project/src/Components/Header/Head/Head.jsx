import React from 'react'

export default function Head({text ,textStyle}) {
  return (
    <div className='w-full p-1 text-center bg-[var(--primary-color)]'>
      <p className ={textStyle}>{text}</p>
    </div>
  )
}
