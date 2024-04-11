import { useState } from "react";
import UpdateAddressDialog from "./UpdateAddressDialog";
import { useUpdateAddressMutation } from "../Redux/api/cartApi";
/* eslint-disable react/prop-types */
const AddressCard = ({ address }) => {
  const [dialog, setDialog] = useState(false);
  const [updateAddress] = useUpdateAddressMutation();
  return (
    <div
      className=" cursor-pointer w-full flex flex-col shadow-xl p-4 rounded gap-3"
      onClick={() => setDialog(true)}
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
      <UpdateAddressDialog
        address={address}
        open={dialog}
        close={() => setDialog(false)}
        submit={(address) => {
          console.log(address);
          updateAddress({ id: address.id, data: address });
          setDialog(false);
        }}
      />
    </div>
  );
};

export default AddressCard;
