import { Tab } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { vendorlogin } from "../../Redux/vendorServices/vendorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
const RegisterSchema = Yup.object().shape({
  vendorName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
  repassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const VendorLoginPage = () => {
  const { isLogged } = useSelector((state) => state.vendor);
  const redirect = useNavigate();
  const tabName = ["Login", "Register"];
  const panels = [
    {
      name: "Login",
      panelComponent: <LoginPanel />,
    },
    {
      name: "Register",
      panelComponent: <RegisterPanel />,
    },
  ];
  useEffect(() => {
    if (isLogged) {
      redirect("/vendor/home");
    }
  }, [isLogged, redirect]);
  
  if (isLogged) {
    return <></>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full md:w-4/6 py-16 px-4 md:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 shadow-md">
            {tabName.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2 md:py-4 text-sm font-semibold leading-5",
                    "ring-white ring-offset-1 ring-offset-white focus:outline-none focus:ring-2",
                    selected
                      ? "bg-darker text-white shadow"
                      : "text-black hover:bg-darker/[0.2] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 ">
            {panels.map((panel) => (
              <Tab.Panel
                key={panel.name}
                className={classNames(
                  "rounded-2xl shadow-lg bg-white p-3",
                  "focus:outline-none "
                )}
              >
                {panel.panelComponent}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const LoginPanel = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center mb-6 ">
        Welcome Back!
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const { email, password } = values;
          const vendors = localStorage.getItem("vendor")
            ? JSON.parse(localStorage.getItem("vendor"))
            : [];
          if (vendors.length != 0) {
            const match = vendors.filter((vendor) => {
              return vendor.email === email;
            });
            if (match.length != 0) {
              if (match[0].password === password) {
                const { vendorName } = match[0];
                dispatch(vendorlogin({ email, vendorName }));
              } else {
                alert("password does not match");
              }
            } else {
              alert("Email is not registered ");
            }
          }
        }}
      >
        <Form className="flex flex-col justify-center items-center space-y-8 translate-x-12">
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-red-600"
            />
          </div>
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="border-[3px] bg-gray-200  w-5/6 h-12 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />

            <ErrorMessage
              name="password"
              component="span"
              className="text-red-600"
            />
          </div>

          <button
            type="submit"
            className="inline-flex -translate-x-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};
const RegisterPanel = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center mb-6 ">
        Create an Vendor account{" "}
      </h1>
      <Formik
        initialValues={{
          VendorName: "",
          email: "",
          password: "",
          repassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const { vendorName, email, password } = values;
          const vendor = localStorage.getItem("vendor")
            ? JSON.parse(localStorage.getItem("vendor")).concat({
                vendorName,
                email,
                password,
              })
            : [{ vendorName, email, password }];

          localStorage.setItem("vendor", JSON.stringify(vendor));
          dispatch(vendorlogin({ vendorName, email }));
        }}
      >
        <Form className="flex flex-col justify-center items-center space-y-6 translate-x-12">
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="vendorName"
              placeholder="Vendor Name"
              className="border-[3px] bg-gray-200 w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />
            <ErrorMessage
              name="vendorName"
              component="span"
              className="inline-block text-red-600"
            />
          </div>
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-red-600"
            />
          </div>
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="password"
              type="password"
              placeholder="Enter a new password"
              className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />

            <ErrorMessage
              name="password"
              component="span"
              className="text-red-600"
            />
          </div>
          <div className="w-11/12 md:w-9/12 space-x-2">
            <Field
              name="repassword"
              type="password"
              placeholder="Retype password"
              className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />

            <ErrorMessage
              name="repassword"
              component="span"
              className="text-red-600"
            />
          </div>

          <button
            type="submit"
            className="inline-flex -translate-x-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default VendorLoginPage;
