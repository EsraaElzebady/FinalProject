import FadeInUp from "../../Components/UI/Animation/FadeInUp/FadeInUp";
import ZoomGlass from "../../Components/UI/Animation/ZoomIn/ZoomGlass";
import AboutInfo from "./AboutClientSection/AboutInfo";
import Team from "./Team/Team";
import React from "react";
import 'F:/Content-447/Glow/Glow/vite-project/src/Pages/About/About.css'
export default function About() {
  return (
    <div className="overflow-x-hidden" >
      <div className="bg-[url(/bg-about-01.jpg)] flex-col gap-y-6 w-full  xl:bg-cover  xl:bg-center 2xl:bg-cover 2xl:bg-center bg-cover   h-140  bg-norepeat flex   justify-center items-left text-left p-35">
       <FadeInUp duration={1} delay={0.2}>
       <p className="uppercase  text-[14px]  pt-5 pe-10 letter-spacing tracking-[1.5px] text-left mb-[20px] font-semibold text-black ">Introducing</p>
       <h1 className="text-5xl font-semibold  text-black">About Glowing</h1>
       </FadeInUp>
      </div>
      <FadeInUp duration={1} delay={0.2}>
      <div className="grid grid-rows-1 grid-cols-1 align-center gap-y-10  mx-auto p-10 mt-10 mb-10">
          <div className="flex flex-col gap-y-5  items-center justify-center w-[50%] mx-auto">
          <div >
             <img src="public\image-sub-heading-01.webp" alt="about-sub-heading image " />
          </div>
        <h3 className="text-4xl text-black text-semibold md:w-fit text-center ">We strive to live with compassion, kindness and empathy</h3>
        <p className="text-[#7E7E7E] text-center text-[16px] font-normal font-[serif]">A lot of so-called stretch denim pants out there are just glorified sweatpants – they get baggy and lose their shape. Not cool. Our tightly knitted fabric holds its form after repeated wear. Plus, Aldays dress up or down, no prob. So you can wear them all day. Get it?</p>
          </div>
      </div>
      </FadeInUp>
      <div>
        <FadeInUp duration={1} delay={0.2}>
          <div className="flex flex-wrap   gap-10 sm:gap-2 mx-auto  mt-10 mb-10 sm:mt-0 sm:mb-0 sm:p-5 justify-center items-center">
            <div className="relative overflow-hidden w-[550px] lg:ms-20 md:ms-0 sm:ms-0 h-[400px] rounded-s-none">
                <ZoomGlass>
                  <img
                    src="/banner-31about.webp"
                    className="w-full  object-cover "
                    alt="banner-31-about-img"
                  />

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="glassShine"></div>
                  </div>
                </ZoomGlass>
              </div>
            <div className="flex flex-col gap-y-5 items-center justify-center w-90 mx-auto">
              <h3 className="text-3xl text-black text-semibold  text-left ">
              Give your skin a healthy glow everyone
              </h3>
              <p className="text-[#7E7E7E] text-left text-[16px] font-[times] leading-relaxed">
              Luxe, lightweight, and made with the perfect blend of cashmere and cotton, our Sonoma Pillows and Throws are inspired by the basics we turn to season after season. Get to know the cozy essentials that will elevate your space in an instant.
              </p>

            </div>
            <div className="flex flex-col gap-y-5  justify-center  gap-x-6 w-100 md:mx-auto  lg:px-10  sm:mx-0 sm:px-0 xl:mx-0 2xl:mx-0">
              <h3 className="text-3xl text-black text-semibold  text-left ">
              Our misstion
              </h3>
              <p className="text-[#7E7E7E] text-[16px]  text-justify  font-[times] leading-relaxed">
              Luxe, lightweight, and made with the perfect blend of cashmere and cotton, our Sonoma Pillows and Throws are inspired by the basics we turn to season after season. Get to know the cozy essentials that will elevate your space in an instant.              </p>
              </div>
              <div className="relative overflow-hidden lg:ps-10 md:ps-0 sm:ps-0 lg:ms-35 md:ms-35 sm:ms-0  w-[550px] h-[400px] rounded-s-none">
                <ZoomGlass>
                  <img
                    src="/banner-32about.webp"
                    className="w-full h-full  object-cover"
                    alt="banner-32-about-img"
                  />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="glassShine"></div>
                  </div>
                </ZoomGlass>
              </div>




            </div>
            
          </FadeInUp>
          <AboutInfo />
      </div>
      <Team />
   


    </div>
  )
}
