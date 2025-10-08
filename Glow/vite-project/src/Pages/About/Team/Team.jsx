import React, { useEffect, useState } from "react";
import Sociallink from "../../../Components/UI/SocialLinks/Sociallink";
import axios from "axios";
import { API_URL } from "../../../Store/useCartStore";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../About.css";


export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/teams`, {
          params: { populate: "img" },
        });
        setTeamMembers(res.data.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeamMembers();
  }, []);


  return (
    <div className="h-fit bg-white p-20 lg:p-16 md:p-10 sm:p-6">
      <h3 className="text-3xl text-black font-bold  w-[650px] lg:w-[500px] md:w-[400px] sm:w-fit am:mx-0 mx-auto flex justify-center sm:justify-start items-center text-center mt-20 mb-10">
        We pride ourselves on having a team of highly skilled
      </h3>

      <div className="relative">
        <Swiper
          spaceBetween={20}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper bg-white w-full"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {teamMembers.map((member) => {
            const imageUrl = member.img?.formats?.small?.url
              ? `${API_URL}${member.img.formats.small.url}`
              : `${API_URL}${member.img?.url}`;

            return (
              <SwiperSlide className="bg-white w-full" key={member.documentId}>
                <div className="flex flex-col bg-white w-full items-left text-left">
                  <div className="relative w-full h-[400px] shadow-md group overflow-hidden">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={member.member_name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full bg-[#EEEEEE] py-2 flex justify-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                      <Sociallink socialLink={member.instagram_link} socialIcon={<FaInstagram />} />
                      <Sociallink socialLink={member.x_link} socialIcon={<FaXTwitter />} />
                      <Sociallink socialLink={member.facebook_link} socialIcon={<FaFacebookF />} />
                      <Sociallink socialLink={member.youtube_link} socialIcon={<FaYoutube />} />
                    </div>
                  </div>
                  <h4 className="text-[16px] capitalize text-left font-semibold mt-4">
                    {member.member_name}.
                  </h4>
                  <p className="text-gray-500 text-[12px] mt-2 capitalize">
                    - {member.member_position}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="custom-pagination flex justify-center mt-10"></div>
      </div>
    </div>
  );
}
