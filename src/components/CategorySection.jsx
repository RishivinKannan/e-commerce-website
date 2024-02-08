import {
  VendorIcon,
  TopwearIcon,
  BottomwearIcon,
  FootwearIcon,
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
    }
  ];
  return (
    <div className=" shadow-lg py-3 px-4 flex justify-start gap-4 w-full overflow-x-auto scrollbar-thin scrollbar-track-transparent">
      <div className="pr-4 border-r-2 border-gray-300">
        <Tooltip arrow={true} title={"Vendor Store"}>
          <div className="rounded-full bg-lightest px-4 py-4 lg:p-5">
            <VendorIcon className="w-8 lg:w-10 " />
          </div>
        </Tooltip>
      </div>
      {categories.map((category) => (
        <Tooltip key={category.name} arrow={true} title={category.name}>
          <Link to={`/category?name=${category.name.replace(/\s+/g ,'-')}`}>
          <div className="rounded-full bg-lightest px-4 py-4 lg:p-5">
            {category.icon}
          </div>
          </Link>
        </Tooltip>
      ))}
      
    </div>
  );
}

export default CategorySection;
