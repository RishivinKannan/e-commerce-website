import TrackerCard from "./TrackerCard";

const FavouritePage = () => {
  return (
    <>
      <div className="pt-28 pb-16 px-6  bg-gray-100 space-y-10 min-h-screen">
        <div>
          <span className="text-2xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
            Price Tracker
          </span>
        </div>
        <div className="flex flex-col space-y-6">
          <TrackerCard />
          <TrackerCard />
        </div>
      </div>
    </>
  );
};

export default FavouritePage;
