
import Section from "./Section"
export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center pt-20 bg-gray-100 text-darker">
      <Section Heading={"TOP PICKS FOR YOU"} ProductUrl={"./Toppicks.json"}/>
      <Section Heading={"NEW ARRIVALS"} ProductUrl={"./NewArrivals.json"}/>
      <Section Heading={"TOP IN SALES"} ProductUrl={"./Topsales.json"}/>
    </div>
  );
}
