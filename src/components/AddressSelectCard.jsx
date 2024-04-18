/* eslint-disable react/prop-types */
const AddressSelectCard = ({ address, select, onClick }) => {
  return (
    <div
      className={`${select ? "outline outline-blue-500 outline-offset-3" : ""}
       cursor-pointer w-full flex flex-col shadow-xl p-4 rounded gap-3 bg-white`}
      onClick={() => onClick()}
    >
      <h2 className="text-base md:text-lg leading-5 font-semibold  min-w-56 md:min-w-80">
        {address.title}
      </h2>
      <ul className="text-xs font-semibold text-gray-400 space-y-2">
        <li>{address.line_1}</li>
        <li>{address.line_2}</li>
        <li>{address.city}</li>
        <li>{address.state}</li>
        <li>{address.pincode}</li>
      </ul>
    </div>
  );
};

export default AddressSelectCard;
