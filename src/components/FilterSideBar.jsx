

// eslint-disable-next-line react/prop-types
const FilterSideBar = ({ optionsList }) => {
    
  return (
    <div className="pt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const params = new URLSearchParams(data);
          console.log(params.toString());
          console.log(params.getAll("Gender"));
        }}
      >
        <button
          type="submit"
          className=" rounded py-1 px-2 w-full text-white bg-darker text-lg font-bold tracking-widest hover:outline outline-gray-500"
        >
          Filter
        </button>
        {Object.entries(optionsList).map(([key, values]) => (
          <>
            <span className="text-lg  font-semibold flex items-center gap-2 py-4">
              {key}
            </span>
            <ul className="flex flex-wrap gap-4">
              {values.map((value) => (
                <li key={value} className="space-x-2">
                  <input type="checkbox" name={key} value={value} />
                  <span className="text-gray-600">{value}</span>
                </li>
              ))}
            </ul>
          </>
        ))}
      </form>
    </div>
  );
};

export default FilterSideBar;
