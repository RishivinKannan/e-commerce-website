import {
  VendorIcon,
  TopwearIcon,
  BottomwearIcon,
  FootwearIcon,
  MobileIcon,
  ComputerIcon,
  HeadphonesIcon,
  TvIcon,
  WatchIcon,
  SpeakerIcon,
  MicrowaveIcon,
} from "../utils/CategoriesIcon";
import {Link} from 'react-router-dom'
import { Tooltip } from "@mui/material";

function CategorySection() {
  const categories = [
    {
      name: "Top Wear",
      icon: <TopwearIcon className="w-8 lg:w-10 " />,
    },
    {
      name: "Bottom Wear",
      icon: <BottomwearIcon className="w-8 lg:w-10 " />,
    },
    {
      name:"Foot Wear",
      icon: <FootwearIcon className="w-8 lg:w-10 " />
    },
    {
      name:"MobileAccessories",
      icon: <MobileIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"ComputersAccessories",
      icon: <ComputerIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"Headphones",
      icon: <HeadphonesIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"TVAccessories",
      icon: <TvIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"SmartWatches",
      icon: <WatchIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"HomeAudio",
      icon: <SpeakerIcon className="w-8 h-auto lg:w-10" />
    },
    {
      name:"HomeAppliances",
      icon: <MicrowaveIcon className="w-8 h-auto lg:w-10" />
    },
  ];
  return (
    <div className="flex justify-start w-full gap-4 px-4 py-3 overflow-x-auto shadow-lg  scrollbar-thin scrollbar-track-transparent">
      <div className="pr-4 border-r-2 border-gray-300">
        <Tooltip arrow={true} title={"Vendor Store"}>
          <div className="px-4 py-4 rounded-full bg-lightest lg:p-5">
            <VendorIcon className="w-8 lg:w-10 " />
          </div>
        </Tooltip>
      </div>
      {categories.map((category) => (
        <Tooltip key={category.name} arrow={true} title={category.name}>
          <Link to={`/category/${category.name.replace(/\s+/g ,'-')}`}>
          <div className="px-4 py-4 rounded-full bg-lightest lg:p-5">
            {category.icon}
          </div>
          </Link>
        </Tooltip>
      ))}
      
    </div>
  );
}

export default CategorySection;
