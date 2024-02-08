/* eslint-disable react/prop-types */

import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "../utils/Icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ Heading, ProductUrl }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(ProductUrl).then((res) => setProducts(res.data));
  }, [ProductUrl]);

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
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 472,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          dots: true
        }
      }
    ]
  };


  return (
    <section className="w-full py-12 px-6  flex flex-col">
      <h1 className="text-3xl font-extrabold tracking-wider px-7 [text-shadow:2px_2px_3px_var(--tw-shadow-color)] shadow-gray-500">{Heading}</h1>
      <div className="px-4 pb-4 pt-8 w-full">
        {products == [] ? (
          "LOADING"
        ) : (
          <div className="slider-container">
          <Slider {...settings}>
            {products.map((product) => (
              <ProductCard
                key={product.ProductId}
                imageUrl={product.ImageURL}
                title={product.ProductTitle}
                rating={4}
              />
            ))}
          </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
