import { useGetTrackersQuery } from "../Redux/api/trackerApi";
import TrackerCard from "./TrackerCard";

const PriceTracker = () => {
  const { data: trackers, isLoading } = useGetTrackersQuery();
  if (isLoading) {
    return <div className="min-h-screen"></div>;
  }
  if(trackers.length == 0){
    return <div className="pt-16 min-h-screen flex justify-center items-center">
      <span className="text-gray-500 text-2xl font-semibold">
        No Trackers Item
      </span>
    </div>;
  }
  return (
    <>
      <div className="pt-28 pb-16 px-6  bg-gray-100 space-y-10 min-h-screen">
        <div>
          <span className="text-2xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
            Price Tracker
          </span>
        </div>
        <div className="flex flex-col space-y-6">
          {trackers.map((tracker) => (
            <TrackerCard key={tracker.id} {...tracker} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PriceTracker;
