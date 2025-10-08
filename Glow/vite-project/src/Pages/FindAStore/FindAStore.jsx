import React from 'react'
import ZoomGlass from '../../Components/UI/Animation/ZoomIn/ZoomGlass'
import NewYorkStore from './NewYorkStore/NewYorkStore'
import CaliforniaStore from './CaliforniaStore/CaliforniaStore'

export default function FindAStore() {
  return (
    <>
    <div>
        <div className='grid grid-rows-1 lg:mx-auto text-center lg:w-150 sm:mx-1 md:mx-auto sm:w-fit p-10'>
    <h3 className='text-2xl '>  Find a Store</h3>
        <p>We’re talking about clean beauty gift sets, of course – and we’ve got a bouquet of beauties for yourself or someone you love.</p>
    </div>
    <div className='grid  grid-rows-2 gap-10 p-10 w-full'>
        <NewYorkStore />
        <CaliforniaStore />

    </div>
    </div>
    </>
  )
}

