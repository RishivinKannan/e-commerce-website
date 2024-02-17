/* eslint-disable react/prop-types */
import { HistoryIcon } from "../../utils/Icons";

export default function RecentHistory({
  input,
  suggestionList,
  onSelect,
  getRef,
}) {
  return (
    <div
      className={
        "absolute w-[95%] translate-y-8 left-3  bg-white text-black mt-2 rounded-xl shadow-2xl lg:translate-y-7 lg:left-0 lg:w-full z-[100]  "
      }
    >
      <div className="text-sm font-semibold text-purple-800 tracking-wide flex flex-col">
        {suggestionList.toReversed().filter((history) => {
          return (
            history.toLowerCase().includes(input.toLowerCase()) &&
            history.toLowerCase() !== input.toLowerCase()
          );
        }).length == 0 ? (
          <div className="  font-bold tracking-wider p-5 text-left text-gray-500">
            No Results
          </div>
        ) : (
          suggestionList
            .toReversed()
            .filter((history) => {
              return history.toLowerCase().includes(input.toLowerCase());
            })
            .map((history, index, arr) => {
              return index < 10 ? (
                <button
                  key={index + history}
                  name='history'
                  className={`text-xs font-semibold  tracking-wide hover:bg-gray-300 focus:bg-gray-300 focus:outline-none ${
                    arr.length - 1 === index
                      ? "rounded-b-lg"
                      : "" + index == 0
                      ? "rounded-t-lg"
                      : ""
                  }`}
                  onClick={() => {
                    onSelect(history);
                    getRef.current.focus();
                  }}
                >
                  <div className="flex items-center justify-start space-x-2 py-3 px-5">
                    <HistoryIcon className={"w-4 h-3 text-black"} />
                    <span>{history}</span>
                  </div>
                  {arr.length - 1 === index ? (
                    ""
                  ) : (
                    <hr className="bg-gray-200 h-[2px] w-full" />
                  )}
                </button>
              ) : (
                ""
              );
            })
        )}
      </div>
    </div>
  );
}
