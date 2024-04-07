import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import ProductImage from "../ProductImage";
import {
  useGetCategoriesQuery,
  useGetVendorProductByIdQuery,
  useUpdateProductMutation,
} from "../../Redux/api/vendorApi";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  ProductTitle: Yup.string()
    .min(10, "Minimum 10 Characters")
    .required("Required"),
  Brand: Yup.string().required("Required"),
  SubCategory: Yup.string().required("Required"),
  actual_price: Yup.number().positive("Only Positive").required("Required"),
  discounted_price: Yup.number().positive("Only Positive").required("Required"),
  countInStock: Yup.number()
    .positive("Only Positive")
    .integer("it should be integer")
    .required("Required"),
  about_product: Yup.string().min(30).required("Required"),
});
const VendorProductPage = () => {
  // const [product, setProduct] = useState([]);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const [updateProduct, data] = useUpdateProductMutation();
  const { data: Categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (data?.isSuccess) {
      alert("Product Changed Successfully");
    }
    if (data?.isError) {
      alert(" Unsuccessfull");
      console.error(data?.error);
    }
  }, [data]);

  const { data: product } = useGetVendorProductByIdQuery(id);
  console.log(product);

  return (
    <div className="p-4 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold leading-9">
          Product Page
        </h1>
        <button
          onClick={() => setEdit(true)}
          className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
        >
          Edit
        </button>
      </div>

      <div className="flex p-4 gap-8 w-full">
        <div className="">
          <div>
            <h1 className="text-center font-semibold text-lg">Cover Image</h1>
            <ProductImage images={[BACKEND_URL + product?.ImageURL]} small />
          </div>
          {product?.images.length == 0 ? (
            ""
          ) : (
            <div>
              <h1 className="text-center font-semibold text-lg">Images</h1>

              <ProductImage
                images={product?.images?.map(
                  (image) => BACKEND_URL + image?.ImageURL
                )}
                small
              />
            </div>
          )}
        </div>
        <div className="py-4 w-4/6">
          <Formik
            enableReinitialize
            initialValues={{
              ProductTitle: product?.ProductTitle,
              Brand: product?.Brand,
              SubCategory: product?.SubCategoryID,
              actual_price: product?.actual_price,
              discounted_price: product?.discounted_price,
              about_product: product?.about_product,
              countInStock: product?.countInStock,
              cover_image: "",
              images: [],
              specs: product?.specs,
            }}
            validationSchema={Schema}
            onSubmit={(values) => {
              console.log(values);
              updateProduct({ values, id });
              setEdit(false);
            }}
          >
            {(prop) => (
              <Form className="w-full flex flex-col justify-center items-start space-y-8 translate-x-12">
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="ProductTitle"
                    type="text"
                    placeholder="Product Title"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="ProductTitle"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="Brand"
                    type="text"
                    placeholder="Brand Name"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="Brand"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <select
                    name="SubCategory"
                    value={prop.values.SubCategory}
                    onChange={prop.handleChange}
                    defaultValue={prop.values.SubCategory}
                    disabled={!edit}
                    className="border-[3px]  bg-gray-200 w-5/6 h-12 rounded  px-4 font-semibold focus:outline-none focus:border-gray-500 disabled:text-gray-700"
                  >
                    <option
                      className="bg-white text-gray-600"
                      value=""
                      disabled
                    >
                      Select a Category
                    </option>

                    {Categories?.map((category) => (
                      <option
                        key={category.id}
                        className="bg-white text-black"
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="SubCategory"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="actual_price"
                    type="number"
                    placeholder="MRP"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="actual_price"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="discounted_price"
                    type="number"
                    placeholder="Price"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="discounted_price"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="countInStock"
                    type="number"
                    placeholder="Count In Stock"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="countInStock"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <textarea
                    placeholder="Description"
                    rows={6}
                    cols={20}
                    className="border-[3px] bg-gray-100 w-5/6 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    name="about_product"
                    onChange={prop.handleChange}
                    onBlur={prop.handleBlur}
                    value={prop.values.about_product}
                    disabled={!edit}
                    required
                  />

                  <ErrorMessage
                    name="about_product"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <FieldArray
                    name="specs"
                    render={(arrayHelpers) => (
                      <div className="w-5/6 space-y-4">
                        {prop.values.specs?.map((spec, index) => (
                          <div key={index} className="flex justify-between ">
                            <Field
                              name={`specs[${index}].specName`}
                              placeholder="Spec Name"
                              className="disabled:text-gray-500 placeholder:border-[3px] col-span-3 bg-gray-200  h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                              disabled={!edit}
                            />
                            <Field
                              name={`specs.${index}.specDetail`}
                              placeholder="Spec detail"
                              disabled={!edit}
                              className="disabled:text-gray-500 border-[3px] col-span-3 bg-gray-200  h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                            />

                            <button
                              type="button"
                              className="disabled:cursor-not-allowed flex justify-center items-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4  text-white hover:outline  outline-gray-500"
                              disabled={!edit}
                              onClick={() =>
                                index > 0 && arrayHelpers.remove(index)
                              }
                            >
                              -
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          disabled={!edit}
                          className="disabled:cursor-not-allowed float-right flex justify-center items-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1 text-white hover:outline  outline-gray-500 "
                          onClick={() =>
                            arrayHelpers.push({
                              specName: "",
                              specDetail: "",
                            })
                          }
                        >
                          Add Spec
                        </button>
                      </div>
                    )}
                  />
                  {/* <Field
                    name="countInStock"
                    type="number"
                    placeholder="Count In Stock"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                  /> */}

                  <ErrorMessage
                    name="specs"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                {edit ? (
                  <>
                    <div className="w-11/12 md:w-9/12 gap-4 flex">
                      <label className="inline-block text-gray-600 font-semibold">
                        Update Cover:
                      </label>
                      <input
                        type="file"
                        name="cover_image"
                        accept="image/*"
                        disabled={!edit}
                        onChange={(e) =>
                          prop.setFieldValue(
                            "cover_image",
                            e.currentTarget.files[0]
                          )
                        }
                        className="w-9/12 text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                      />
                    </div>
                    <div className="w-11/12 md:w-9/12 gap-4 flex">
                      <label className="inline-block text-gray-600 font-semibold">
                        Update Photos:
                      </label>
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        disabled={!edit}
                        onChange={(event) => {
                          prop.setFieldValue(
                            "images",
                            Array.from(event.target.files)
                          );
                          console.log(prop.values);
                        }}
                        className="w-9/12 text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                      />
                    </div>

                    <div className="space-x-8">
                      <button
                        type="submit"
                        className="inline-flex -translate-x-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          prop.resetForm();
                          setEdit(false);
                        }}
                        className="inline-flex -translate-x-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-red-600 px-4 py-1  text-white hover:outline  outline-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VendorProductPage;
