import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../../Redux/api/vendorApi";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import success from "../../assets/successfull.gif";
import ThankYou from "../../assets/Thank_you.mp3";

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
const NewProductPage = () => {
  const [dialog, setDialog] = useState(false);
  const navigate = useNavigate();
  const [addProduct, data] = useAddProductMutation();
  const { data: Categories } = useGetCategoriesQuery();
  useEffect(() => {
    if (data?.isSuccess) {
      setDialog(true);
    }
    if (data?.isError) {
      alert(" Unsuccessfull");
      console.error(data?.error);
    }
  }, [data]);
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold leading-9">
        Add New Product
      </h1>
      <div className="flex justify-center items-center w-full">
        <div className="p-4 w-10/12">
          <Formik
            initialValues={{
              ProductTitle: "",
              Brand: "",
              SubCategory: "",
              actual_price: "",
              discounted_price: "",
              countInStock: "",
              about_product: "",
              cover_image: "",
              images: [],
              specs: [
                {
                  specName: "",
                  specDetail: "",
                },
              ],
            }}
            validationSchema={Schema}
            onSubmit={(values) => {
              console.log(values);
              addProduct(values);
            }}
          >
            {(prop) => (
              <Form className="flex flex-col justify-center items-center space-y-8 translate-x-12">
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="ProductTitle"
                    type="text"
                    placeholder="Product Title"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px]  bg-gray-200 w-5/6 h-12 rounded  px-4 font-semibold focus:outline-none focus:border-gray-500 "
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-100 w-5/6 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                    name="about_product"
                    onChange={prop.handleChange}
                    onBlur={prop.handleBlur}
                    value={prop.values.about_product}
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
                        {prop.values.specs.map((spec, index) => (
                          <>
                            <div key={index} className="flex justify-between ">
                              <Field
                                name={`specs[${index}].specName`}
                                placeholder="Spec Name"
                                className="border-[3px] col-span-3 bg-gray-200  h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                              />
                              <Field
                                name={`specs.${index}.specDetail`}
                                placeholder="Spec detail"
                                className="border-[3px] col-span-3 bg-gray-200  h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                              />

                              <button
                                type="button"
                                className="flex justify-center items-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4  text-white hover:outline  outline-gray-500"
                                onClick={() =>
                                  index > 0 && arrayHelpers.remove(index)
                                }
                              >
                                -
                              </button>
                            </div>
                            <ErrorMessage
                              name={`specs[${index}].specName`}
                              component="span"
                              className="text-red-600"
                            />
                            <ErrorMessage
                              name={`specs[${index}].specDetail`}
                              component="span"
                              className="text-red-600"
                            />
                          </>
                        ))}
                        <button
                          type="button"
                          className="float-right flex justify-center items-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1 text-white hover:outline  outline-gray-500 "
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
                <div className="w-11/12 md:w-9/12 gap-4 flex">
                  <label className="inline-block text-gray-600 font-semibold">
                    Cover Photo :
                  </label>
                  <input
                    type="file"
                    name="cover_image"
                    accept="image/*"
                    required
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
                    Photos :
                  </label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      prop.setFieldValue(
                        "images",
                        Array.from(event.target.files)
                      );
                    }}
                    className="w-9/12 text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex -translate-x-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                >
                  Add product
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Transition appear show={dialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setDialog(false);
            navigate("/vendor/products");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="translate-x-28 w-4/6 h-96 transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all flex justify-center items-center flex-col space-y-4">
                  <img src={success} className="w-56" />
                  <audio src={ThankYou} autoPlay />
                  <h1 className="font-bold text-4xl p-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500 tracking-wide">
                    Product Successfully Added
                  </h1>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NewProductPage;
