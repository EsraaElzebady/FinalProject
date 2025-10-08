import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './SliderHome.css';
import '../../index.css';
import 'animate.css';
import Button from '../../Components/UI/Button/Button';
import { heroSectionInfo } from '../../Data/Data';

export default function SliderHome() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"></span>`;
    },
  };
  return (
    <Swiper
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] "
      modules={[Pagination, Autoplay]}
      pagination={pagination}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {heroSectionInfo.map((slide) => (
        <SwiperSlide
          key={slide.id}
          className="relative flex items-center justify-start px-6 sm:px-10"
        >
          <div
            className="absolute inset-0  bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          <div className="absolute  inset-0 bg-white/10"></div> 

          <div className="relative max-w-[450px] py-50 z-10 ">
            <p className="uppercase mb-3 text-xs sm:text-sm font-semibold text-black animate__animated animate__fadeInUp animate__dalay-300 ">  
              {slide.headTitle}
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal text-black leading-snug md:leading-[4rem] lg:leading-[5rem] animate__animated animate__fadeInUp animate__delay-500  animate__slow mb-2">
              {slide.title}
            </h1>
            <p className="text-gray-600 mb-8 text-sm sm:text-base md:text-lg animate__animated animate__fadeInUp animate__delay-1s  animate__slow">
              {slide.description}
            </p>
            <Button 
              className="bg-black rounded-[4px] mt-5 hover:bg-[var(--primary-color)] hover:text-white animate__animated animate__fadeInUp animate__delay-2s  animate__slow transition-colors duration-300 ease-in-out"
              buttonText={slide.buttonText}
              buttonWidth="12px 40px"   
              linkTo={"/products"}
              textColor="white" 
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
