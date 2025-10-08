import React from 'react'
import Company from '../UI/Company/Company'
import UsefulLink from '../UI/UsefulLink/UsefulLink'
import Information from '../UI/Information/Information'
import EmailSubscribtion from '../UI/EmailSubscribtion/EmailSubscribtion'
import FooterPay from '../UI/FooterPay/FooterPay'

export default function Footer() {
  return (
<div>
< div className='bg-[#F8F8F8]  w-full py-8 flex flex-wrap justify-between'>
    <div className='flex flex-wrap   justify-between'>
      <Company />
      <UsefulLink />
      <Information />
    </div>
    <EmailSubscribtion />
    </div>
    <div className='bg-[#F8F8F8] w-full py-5  text-center'>
      <FooterPay />
</div>

</div>
  )
}
