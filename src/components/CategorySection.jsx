import { VendorIcon } from "../utils/CategoriesIcon";
import { Tooltip } from "@mui/material";

function CategorySection() {
  return (
    <div className="bg-gray-50 shadow-lg py-3 px-4 flex justify-start gap-4 w-full overflow-x-hidden">
      <div className="pr-4 border-r-2 border-gray-300">
        <Tooltip arrow={true} title={"Vendor Store"}>
          <div className="rounded-full bg-lightest px-4 py-2 lg:p-7">
            <VendorIcon className="w-8 lg:w-12 " />
          </div>
        </Tooltip>
      </div>
      <Tooltip arrow={true} title={"Vendor Store"}>
        <div className="rounded-full bg-lightest px-4 py-2 lg:p-7">
          <VendorIcon className="w-8 lg:w-12 " />
        </div>
      </Tooltip>
      <Tooltip arrow={true} title={"Vendor Store"}>
        <div className="rounded-full bg-lightest px-4 py-2 lg:p-7">
          <VendorIcon className="w-8 lg:w-12 " />
        </div>
      </Tooltip>
    </div>
  );
}

export default CategorySection;
