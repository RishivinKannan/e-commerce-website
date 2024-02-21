/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";
import ProductCardShimmer from "./ProductCardShimmer";
import { NextArrow, PrevArrow } from "../utils/Icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ Heading, products, loading }) {
  var settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 472,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section className="w-full py-12 px-6 flex flex-col">
        <h1 className="text-3xl font-extrabold text-center tracking-wider px-7">
          <span className="inline-block w-96 h-10 p-2 bg-slate-300/60 animate-pulse"></span>
        </h1>
        <div className="px-4 pb-4 pt-8 w-full">
          <div className="slider-container w-full">
            <Slider {...settings}>
              {Array(4)
                .fill()
                .map((x, i) => (
                  <ProductCardShimmer key={i} />
                ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-6 flex flex-col">
      <h1 className="text-3xl font-extrabold text-center tracking-wider px-7  ">
        {Heading}
      </h1>
      <div className="px-4 pb-4 pt-8 w-full">
        <div className="slider-container w-full">
          <Slider {...settings}>
            {products?.map((product) => (
              <ProductCard
                key={product.ProductId}
                id={product.ProductId}
                imageUrl={product.ImageURL}
                title={product.ProductTitle}
                rating={4}
                showFav
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
