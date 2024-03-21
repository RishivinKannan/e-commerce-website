import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as Yup from "yup";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().required("Required"),
// });
const VendorProductPage = () => {
  const [product, setProduct] = useState([]);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios.get("../../fashionProducts.json").then((res) => {
      setProduct(res.data.filter((data) => data.ProductId.toString() == id));
    });
  }, [id]);
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

      <div className="grid grid-cols-6 px-6">
        <div className="col-span-2 w-full">

        <img src={product[0]?.ImageURL} className="w-80 h-72 shadow-lg p-2" />
        </div>
        <div className="py-4 w-11/12 col-span-4">
          <Formik
            enableReinitialize
            initialValues={{
              productName: product[0]?.ProductTitle,
              brand: product[0]?.ProductType,
              category: product[0]?.SubCategory,
              mrp: 300,
              price: 200,
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eos delectus, quaerat asperiores molestias sunt ipsum unde? Reprehenderit iusto eius perspiciatis, facere deserunt voluptatibus sapiente voluptatum fuga dolor explicabo minus!",
              photo: "",
              photos: "",
            }}
            // validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(prop) => (
              <Form className="flex flex-col justify-center items-start space-y-8 translate-x-12">
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="productName"
                    type="text"
                    placeholder="Product Title"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="productName"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="brand"
                    type="text"
                    placeholder="Brand Name"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="brand"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="category"
                    type="text"
                    placeholder="Category"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="category"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="mrp"
                    type="number"
                    placeholder="MRP"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="mrp"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="price"
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
                    name="description"
                    onChange={prop.handleChange}
                    onBlur={prop.handleBlur}
                    value={prop.values.description}
                    disabled={!edit}
                    required
                  />

                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 gap-4 flex">
                  <label className="inline-block text-gray-600 font-semibold">
                    Update Cover:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    disabled={!edit}
                    onChange={(e) =>
                      prop.setFieldValue("photo", e.currentTarget.files[0])
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
                    name="photos"
                    accept="image/*"
                    multiple
                    disabled={!edit}
                    onChange={(event) => {
                      prop.setFieldValue(
                        "photos",
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
                {edit ? (
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
