import { SearchIcon } from "../../utils/Icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentHistory from "./RecentHistory";
import { removeDuplicates } from "../../utils/constants";
// eslint-disable-next-line react/prop-types
export default function SearchBox({ setShow }) {
  const [inputValue, setInputValue] = useState("");
  const [historyValue, setHistoryValue] = useState([]);
  const [focus, setFocus] = useState(false);
  const toNavigation = useNavigate();
  useEffect(() => {
    const local = localStorage.getItem("recentHistory")
      ? JSON.parse(localStorage.getItem("recentHistory"))
      : [];
    setHistoryValue(local);
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.code === "Space") {
        inputRef.current.focus();
      }
      if (e.key === "Escape") {
        inputRef.current.blur();
        setInputValue("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const inputRef = useRef(null);

  return (
    <>
      <div className="flex w-full p-2 text-black bg-white rounded-lg shadow-xl">
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-11/12 ml-2 font-semibold tracking-wide outline-none "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputValue != "") {
                const historyAdder = removeDuplicates(
                  historyValue.concat(inputValue)
                );

                localStorage.setItem(
                  "recentHistory",
                  JSON.stringify(historyAdder)
                );
                setFocus(false);
                setHistoryValue(historyAdder);
                inputRef.current.blur();
                setShow(false);
                toNavigation(
                  `/search/${inputValue.replace(/\s+/g, "-")}`
                );
              }
            }
            if (e.key === "Escape") {
              inputRef.current.blur();
              setInputValue("");
            }
          }}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            e.relatedTarget === null ? setFocus(false): e.relatedTarget.name === 'history'? null:setFocus(false);
          }}
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
