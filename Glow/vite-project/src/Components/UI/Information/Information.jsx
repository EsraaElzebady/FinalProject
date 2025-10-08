import React from 'react'
import Links from '../Links/Links'

export default function Information() {
  return (
    <div className='flex flex-col font-[poppins] text-[15px] hover:text-black p-2 pt-4  text-[var(--footer-links-color)]'>
        <p className='text-black capitalize font-normal text-2xl mb-5'>
            information
        </p>
        <div className='flex flex-col'>
                  <Links link="findastore"  linkText='Find a store'/>
                    <Links link="contact"    linkText='contact us ' />
                    <Links link="faq"  linkText=" shipping FAQ"/>
                    <Links link="termsandconditions"           linkText = "terms & conditions"/>
                    <Links link="privacypolicy"           linkText = "privacy policy"/>
          </div>
        
      
    </div>
  )
}
