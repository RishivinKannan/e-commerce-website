import { SearchIcon } from "../../utils/Icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentHistory from "./RecentHistory";
export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [historyValue, setHistoryValue] = useState([]);
  const [focus, setFocus] = useState(false);
  const toNavigation = useNavigate();
  useEffect(() => {
    const local = localStorage.getItem("recentHistory")
      ? JSON.parse(localStorage.getItem("recentHistory"))
      : [];
    setHistoryValue(local);
    console.log(local);
  }, []);

  const inputRef = useRef(null);

  return (
    <>
      <div className="p-2 flex bg-white text-black w-full rounded-lg shadow-xl">
        <SearchIcon />
        <input
        ref={inputRef}
          type="text"
          placeholder="Search..."
          className="outline-none ml-2 font-semibold tracking-wide w-11/12 "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(inputValue != ""){
                const historyAdder = historyValue.concat(inputValue);
              localStorage.setItem(
                "recentHistory",
                JSON.stringify(historyAdder)
              );
              setFocus(false); 
              setHistoryValue(historyAdder);
              inputRef.current.blur();
              toNavigation(`/search?query=${inputValue.replace(/\s+/g ,'-')}`);
               
              }
              }
            if (e.key === "Escape"){
                inputRef.current.blur();
                setInputValue("");
            }

          }
        }
        onFocus={()=>setFocus(true)}
        />
        {inputValue == "" || !focus ? (
          ""
        ) : (
          <RecentHistory
            input={inputValue}
            suggestionList={historyValue}
            onSelect={setInputValue}
            getRef={inputRef}
          />
        )}
      </div>
    </>
  );
}