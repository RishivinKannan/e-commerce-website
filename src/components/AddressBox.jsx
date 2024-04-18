/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AddAddressDialog from "./AddAddressDialog";
import {
  useGetAddressQuery,
  usePostAddressMutation,
} from "../Redux/api/cartApi";
import AddressSelectCard from "./AddressSelectCard";

const AddressBox = ({ selectState }) => {
  const [dialog, setDialog] = useState(false);
  const [select, setSelect] = selectState;
  const { data: addresses } = useGetAddressQuery();
  const [addAddress, { isError }] = usePostAddressMutation();

  useEffect(() => {
    if (isError) {
      alert("Post Address failed");
    }
  }, [isError]);

  return (
    <div className="w-full  rounded-lg space-y-6 p-4 ">
      <div className="flex justify-between items-center mb-4 ">
        <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
          Select Address
        </span>
        <button
          className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
          onClick={() => {
            setDialog(true);
          }}
        >
          New Address
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
        {addresses?.map((address, index) => (
          <AddressSelectCard
            key={address.id}
            address={address}
            select={index == select}
            onClick={() => setSelect(index)}
          />
        ))}
      </div>
      <AddAddressDialog
        open={dialog}
        close={setDialog}
        submit={(address) => {
          addAddress(address);
          setDialog(false);
        }}
      />
    </div>
  );
};

export default AddressBox;
