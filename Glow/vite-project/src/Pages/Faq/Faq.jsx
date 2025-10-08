import { ZoomIn } from 'lucide-react'
import React from 'react'
import ZoomGlass from '../../Components/UI/Animation/ZoomIn/ZoomGlass'
import OrdersQuestions from './FAQQuestions/Orders & Shipping/OrdersQuestions'
import ReturnExchange from './Returns & Exchanges/ReturnExchange'
import DiscountQuestions from './Discount/DiscountQuestions'

export default function Faq() {
  return (
    <div>
      <h3 className='font-[poppins] text-4xl text-center pt-10'>
        Frequently Asked Questions
      </h3>
      <div className='mx-40 my-10 overflow-hidden '>
        <ZoomGlass >
        <img src='public/Faq/banner-35.webp' className=' w-full h-full ' alt='faq banner'/>
      </ZoomGlass>
      </div>
      <OrdersQuestions />
      <ReturnExchange />
      <DiscountQuestions />



      
    </div>
  )
}
