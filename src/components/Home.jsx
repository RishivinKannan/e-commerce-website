import {useRef} from 'react';
import Banner from "./Banner";
import Section from "./Section";
import CategorySection from "./CategorySection";
export default function Home() {
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
      <Section Heading={"TOP PICKS FOR YOU"} ProductUrl={"./Toppicks.json"}/>
      <Section Heading={"NEW ARRIVALS"} ProductUrl={"./NewArrivals.json"}/>
      <Section Heading={"TOP IN SALES"} ProductUrl={"./Topsales.json"}/>
    </div>
  );
}
