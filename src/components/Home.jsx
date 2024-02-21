import {useRef} from 'react';
import Banner from "./Banner";
import Section from "./Section";
import CategorySection from "./CategorySection";
import {
  useGetTopPicksQuery,
  useGetTopSalesQuery,
  useGetNewArrivalsQuery,
} from "../Redux/api/products";
export default function Home() {
  const {data:Toppicks,isLoading:ToppicksLoading} = useGetTopPicksQuery();
  const {data:Topsales,isLoading:TopsalesLoading} = useGetTopSalesQuery();
  const {data:NewArrivals,isLoading:NewArrivalsLoading} = useGetNewArrivalsQuery();

  const config = [
    {
      id: 'TopPicks',
      title: 'TOP PICKS FOR YOU',
      data: Toppicks,
      loading:ToppicksLoading,
    },
    {
      id: 'NewArrivals',
      title: 'NEW ARRIVALS',
      data: NewArrivals,
      loading:NewArrivalsLoading,
    },
    {
      id: 'Topsales',
      title: 'TOP SALES',
      data: Topsales,
      loading:TopsalesLoading,
    },

  ]

  const scrollRef =useRef(null);
  const scroll =()=>{
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scroll({top: scrollRef.current.offsetTop - headerHeight, behavior:'smooth' });
  }
  return (
    <div className="flex flex-col justify-center items-center pt-20 bg-gray-100 text-darker">
      <Banner scroll={scroll}/>
      <div ref={scrollRef}></div>
      <CategorySection/>
      {
        config.map((section)=>
        <Section key={section?.id} Heading={section?.title} products={section?.data} loading={section?.loading}/> )
      }
      {/* <Section Heading={"TOP PICKS FOR YOU"} products={Toppicks}/>
      <Section Heading={"NEW ARRIVALS"} products={NewArrivals}/>
      <Section Heading={"TOP IN SALES"} products={Topsales}/> */}
    </div>
  );
}
