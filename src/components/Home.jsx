import { useRef } from "react";
import Banner from "./Banner";
import Section from "./Section";
import CategorySection from "./CategorySection";
import {
  useGetTopPicksQuery,
  useGetTopSalesQuery,
} from "../Redux/api/products";
import { useGetNewArrivalQuery } from "../Redux/api/productsDjango";

export default function Home() {
  const { data: Toppicks, isLoading: ToppicksLoading } = useGetTopPicksQuery();
  const { data: Topsales, isLoading: TopsalesLoading } = useGetTopSalesQuery();
  const { data: NewArrivals, isLoading: NewArrivalsLoading } =
    useGetNewArrivalQuery();

  const config = [
    {
      id: "TopPicks",
      title: "TOP PICKS FOR YOU",
      data: Toppicks,
      loading: ToppicksLoading,
    },
    {
      id: "NewArrivals",
      title: "NEW ARRIVALS",
      data: NewArrivals,
      loading: NewArrivalsLoading,
    },
    {
      id: "Topsales",
      title: "TOP SALES",
      data: Topsales,
      loading: TopsalesLoading,
    },
  ];

  console.log(NewArrivals);
  const scrollRef = useRef(null);
  const scroll = () => {
    const headerHeight = document.querySelector("header").offsetHeight;
    window.scroll({
      top: scrollRef.current.offsetTop - headerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center pt-20 bg-gray-100 text-darker">
      <Banner scroll={scroll} />
      <div ref={scrollRef}></div>
      <CategorySection />
      {config.map((section) => (
        <Section
          key={section?.id}
          Heading={section?.title}
          products={section?.data}
          loading={section?.loading}
        />
      ))}
    </div>
  );
}
