import React from 'react'
import Sociallink from '../SocialLinks/Sociallink'
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Logo from '../Logo/Logo';
import FooterPayCards from '../FooterPayCards/FooterPayCards';

export default function FooterPay() {
  const icons = [

    { href: "https://instagram.com", icon: <FaInstagram  /> },
    { href: "https://twitter.com", icon: <FaXTwitter /> },
    { href: "https://facebook.com", icon: <FaFacebookF   />},
    { href: "https://youtube.com", icon: <FaYoutube /> },
  ];

  return (
    <div className=' flex-wrap   flex justify-between   items-center  py-8 px-7' >
          <div className='  text-[14px] flex gap-2 '>
      <p className='text-[#ababab] ms-2 font-semibold'>&copy; Glowing 2025</p>
      <div className='flex pt-1 gap-2'>
        {icons.map((item, index) => (
          <Sociallink key={index} socialLink={item.href} socialIcon={item.icon} />
        ))}

        </div>
    </div>

    <div className='lg:mx-6  sm:mx-0 md:mx-0 lg:p-0 sm:py-3 lg:flex'>    <Logo  widthFit={'160px'}  /></div>
    <div>
        <FooterPayCards />

    </div>
    </div>
  )
}
