import { SearchIcon, History } from "../utils/Icons";
import { useEffect, useState } from "react";
export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [historyValue, setHistoryValue] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("recentHistory")
      ? JSON.parse(localStorage.getItem("recentHistory"))
      : [];
    setHistoryValue(local);
    console.log(local);
  }, []);

  

  return (
    <>
      <div className="p-2 flex bg-white text-black w-full rounded-lg" 
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none ml-2 font-semibold tracking-wide "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const historyAdder = historyValue.concat(inputValue);
              localStorage.setItem(
                "recentHistory",
                JSON.stringify(historyAdder)
              );
              setHistoryValue(historyAdder);
            }
            if (e.key === "Escape") {
                setInputFocus(false);
              }
          }}
          onFocus={()=>setInputFocus(true)}
        />
        {historyValue.length === 0 || (!inputFocus) ? (
        ""
      ) : (
        <div className="absolute w-[95%] translate-y-8 left-3  bg-white text-black mt-2 rounded-xl shadow-2xl lg:max-2xl:translate-y-7 lg:max-2xl:left-0 lg:max-2xl:w-96 z-[100] pb-3">
          <div className="text-sm font-semibold text-purple-800 tracking-wide flex flex-col">
            <div className="px-3 pt-2"> <span className="inline tracking-wider text-black float-left" >Recent Search</span>
            <span className=" text-red-700  cursor-pointer float-right" onClick={()=>setInputFocus(false)}>X</span></div>
           
            {inputValue === ""
              ? historyValue.toReversed().map((history, index, arr) => {
                  return index < 6 ?(
                    <div
                      key={index + history}
                      className="text-xs font-semibold  tracking-wide hover:bg-gray-300 "
                      onClick={()=>{setInputValue(history);
                    }}
                    >
                      <button className="flex items-center justify-start space-x-2 py-3 px-5"
                        >
                        <History className={"w-4 h-3 text-black"} />
                        <span >{history}</span>
                      </button>
                      {arr.length - 1 === index || index == 5 ? (
                        ""
                      ) : (
                        <hr className="bg-gray-200 h-[2px] w-full" />
                      )} 
                    </div>
                  ): null
                })
              : historyValue.toReversed().map((history, index, arr) => {
                 
                  return history.toLowerCase().includes(inputValue.toLowerCase()) ? (

                    <div
                      key={index + history}
                      className="text-xs font-semibold  tracking-wide hover:bg-gray-300 "
                      onClick={()=>{setInputValue(history);
                        }}
                    >
                      <div className="flex items-center justify-start space-x-2 py-3 px-5">
                        <History className={"w-4 h-3 text-black"} />
                        <button>{history}</button>
                      </div>
                      {arr.length - 1 === index ? (
                        ""
                      ) : (
                        <hr className="bg-gray-200 h-[2px] w-full" />
                      )}
                    </div>
                  ) : null
                }  )}
          </div>
        </div>
      )}
      </div>
      
    </>
  );
}
