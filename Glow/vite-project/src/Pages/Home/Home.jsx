import React from 'react'
import SliderHome from './SliderHome'
import Explore from './Explore'
import Prand from './Prand'
import MoreSection from './MoreSection'
import ScrollProgressCircle from '../../Components/UI/ScrollProgressCircle'
import FeaturedProducts from './FeaturedProducts'
import CustomersBeautyEssential from './CustomersBeautyEssential'

export default function Home() {
  return (
    <div className='relative'>
      <SliderHome />
      <FeaturedProducts />
      <Explore />
      <Prand />
      <MoreSection />
      <div className='abslote  bottom-1'>
        <ScrollProgressCircle />
      </div>
      
      
      
    </div>
  )
}
