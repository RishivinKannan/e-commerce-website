/* eslint-disable react/prop-types */
import { History } from "../../utils/Icons";

export default function SearchSuggestion({ suggestionList, onSelect }) {

  if(suggestionList.length == 0){
    return null;
  }
  return (
    <div className="absolute w-[95%] translate-y-8 left-3  bg-white text-black mt-2 rounded-xl shadow-2xl lg:max-2xl:translate-y-7 lg:max-2xl:left-0 lg:max-2xl:w-96 z-[100] pb-3">
      <div className="text-sm font-semibold text-purple-800 tracking-wide flex flex-col">
        <div className="px-3 pt-2">
          {" "}
          <span className="inline tracking-wider text-black float-left">
            Recent Search
          </span>
          <span className=" text-red-700  cursor-pointer float-right">X</span>
        </div>
        {suggestionList.toReversed().map((history, index, arr) => {
          return index < 6 ? (
            <div
              key={index + history}
              className="text-xs font-semibold  tracking-wide hover:bg-gray-300 "
              onClick={() => {
                onSelect(history);
              }}
            >
              <button className="flex items-center justify-start space-x-2 py-3 px-5">
                <History className={"w-4 h-3 text-black"} />
                <span>{history}</span>
              </button>
              {arr.length - 1 === index || index == 5 ? (
                ""
              ) : (
                <hr className="bg-gray-200 h-[2px] w-full" />
              )}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
