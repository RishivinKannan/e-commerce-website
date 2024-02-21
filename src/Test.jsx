import {
  useGetAllProductsQuery,
  useGetTopPicksQuery,
  useGetTopSalesQuery,
  useGetNewArrivalsQuery,
} from "./Redux/api/products";

export default function Test() {

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl">TEST</h1>
      </div>
    </>
  );
}
