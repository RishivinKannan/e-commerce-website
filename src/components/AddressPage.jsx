import { useState } from "react";
import { useSelector } from "react-redux";
import AddAddressDialog from "./AddAddressDialog";

const AddressPage = () => {
  const [dialog, setDialog] = useState(false);
  const { isLogged } = useSelector((state) => state.user);
  const orders = [
    {
      ProductId: 42419,
      ProductTitle: "Gini and Jony Girls Knit White Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg",
    },
    {
      ProductId: 34009,
      ProductTitle: "Gini and Jony Girls Black Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/dce310e4c15223a6c964631190263284_images.jpg",
    },
    {
      ProductId: 40143,
      ProductTitle: "Gini and Jony Girls Pretty Blossom Blue Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/fc3c1b46906d5c148c45f532d0b3ffb5_images.jpg",
    },
  ];

  return (
    <div className="w-full  pt-24 space-y-6 px-3 md:px-10 bg-gray-100">
      <div className="flex justify-between items-center mb-4 ">
        <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
          Saved Address
        </span>
        <button
          className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
          onClick={() => {
            !isLogged ? alert("Please Login first to write a review") : null;
            setDialog(true);
          }}
        >
          Write Review
        </button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3">
        {orders.map(({ ProductId }) => (
          <div
            key={ProductId}
            className="w-full flex flex-col shadow-xl p-4 rounded gap-3"
          >
            <h2 className="text-base md:text-lg leading-5 font-semibold  min-w-56 md:min-w-80">
              Home
            </h2>
            <ul className="text-xs font-semibold text-gray-400 space-y-2">
              <li>Address Line 1</li>
              <li>Address Line 2</li>
              <li>City</li>
              <li>State</li>
              <li>Pincode</li>
            </ul>
          </div>
        ))}
      </div>
      <AddAddressDialog
        open={dialog}
        close={setDialog}
        submit={(address) => {
          console.log(address);
        }}
      />
    </div>
  );
};

export default AddressPage;
