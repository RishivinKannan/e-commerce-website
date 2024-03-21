import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().required("Required"),
// });
const NewProductPage = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold leading-9">
        Add New Product
      </h1>
      <div className="flex justify-center items-center w-full">
        <div className="p-4 w-10/12">
          <Formik
            initialValues={{
              productName: "",
              brand: "",
              category: "",
              mrp:'',
              price:'',
              description: "",
              photo:'',
              photos:'',
            }}
            // validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(prop) => (
              <Form className="flex flex-col justify-center items-center space-y-8 translate-x-12">
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="productName"
                    type="text"
                    placeholder="Product Title"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
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
                    className="border-[3px] bg-gray-100 w-5/6 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                    name="description"
                    onChange={prop.handleChange}
                    onBlur={prop.handleBlur}
                    value={prop.values.description}
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
                    Cover Photo :
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
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
                    Photos :
                  </label>
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
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
    </div>
  );
};

export default NewProductPage;
