import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import ZoomGlass from "../../../Components/UI/Animation/ZoomIn/ZoomGlass";
import Sociallink from "../../../Components/UI/SocialLinks/Sociallink";

export default function NewYorkStore() {
      const socialLinka = [
    
        { href: "https://instagram.com", icon: <FaInstagram  /> },
        { href: "https://twitter.com", icon: <FaXTwitter /> },
        { href: "https://facebook.com", icon: <FaFacebookF   />},
        { href: "https://youtube.com", icon: <FaYoutube /> },
      ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-10 ">
        <div className='overflow-hidden  lg:w-160 sm:w-fit'>
            <ZoomGlass>
            <img src='public/findaStore/store-01.webp' alt='store 1' className=' w-fit overflow-hidden'/>

            </ZoomGlass>
        </div>
        <div>
          <h3 className="capitalize flex justify-center  flex-wrap text-2xl font-semibold"> new york store</h3>
          <div className='grid lg:grid-rows-2 lg:grid-cols-2  sm:grid-cols-1 sm:grid-cols-1 gap-10 lg:p-10 md:p-6 sm:p-4 '>

            <div>
                <h3 className='text-2xl mb-5'>address</h3>
                <p className="mb-3">3245 Abbot Kinney BLVD - PH Venice, CA 124</p>
                <a href='' className="text-black  border-b-1 text-[16px] font-semibold mt-3 border-black  ">Get Direction</a>
            </div>
            <div>
                <h3 className='text-2xl mb-5'>Hour of operation</h3>
                <p className="mb-3">Mon – Fri:<span>08:30 – 20:00</span></p>
                <p className="mb-3">Sat & Sun:<span>09:30 – 21:30</span></p>
            </div>
            <div>
                <h3 className='text-2xl mb-5'>Contact</h3>
                <p className="mb-1">Mobile:<span>068 26589 996</span></p>
                <p className="mb-1">Hotline:<span>1900 26886</span></p>
                <p className="mb-1">Email:<span>hello@grace.com</span></p>
            </div>
            <div>
                <h3 className='text-2xl mb-10'>Social media</h3>
              <div className="flex gap-5 ">
                 {socialLinka.map((item, index) => (
                          <Sociallink key={index} socialLink={item.href} socialIcon={item.icon} />
                        ))}
              </div>
            </div>

          </div>
        </div>
      
    </div>
  )
}
