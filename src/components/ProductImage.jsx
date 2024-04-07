/* eslint-disable react/prop-types */

import { Swiper, SwiperSlide } from "../utils/MySwiper";

const ProductImage = ({ images, small = false }) => {
  const mainsettings = {
    pagination: {
      dynamicBullets: true,
      clickable: true,
    },
  };
  return (
    <div className="w-full h-full">
      <Swiper {...mainsettings}>
        {images?.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={`flex justify-center ${
                    small ? "h-72 lg:h-80" : "h-96 lg:h-[27rem]"
                  }  `}>
                <img
                  src={image}
                  className={`${
                    small ? "w-64 h-64 lg:w-72 lg:h-72" : "w-80 h-80 lg:w-96"
                  } lg:h-96 shadow-2xl rounded-lg  transition-all group-hover:scale-105 group-hover:shadow-2xl`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductImage;
