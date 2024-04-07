import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { UserSolidIcon } from "../utils/Icons";
// import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../Redux/api/user";

const AccountPage = () => {
  const [edit, setEdit] = useState();
  const { data } = useGetUserProfileQuery();
  return (
    <div className="p-4 space-y-4 pt-24 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold leading-9">
          Account Details
        </h1>
        <button
          onClick={() => setEdit(true)}
          className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
        >
          Edit
        </button>
      </div>
      <div className="w-full flex justify-center">
        <UserSolidIcon className="w-40 h-40" />
      </div>
      <div className="w-full flex justify-center">
        <div className="py-4 w-9/12 ">
          <Formik
            enableReinitialize
            initialValues={{
              username: data?.username,
              email: data?.email,
              dob: data?.dob,
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
                    name="username"
                    type="text"
                    placeholder="User Name"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="username"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="dob"
                    type={!edit ? "text" : "date"}
                    placeholder="Date of Birth"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled={!edit}
                  />

                  <ErrorMessage
                    name="dob"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="w-11/12 md:w-9/12 space-x-2">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    disabled
                  />

                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                {edit ? (
                  <div className="w-11/12 md:w-9/12 space-x-2">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Change Password"
                      className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                      disabled={!edit}
                    />

                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-600"
                    />
                  </div>
                ) : null}

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

export default AccountPage;
