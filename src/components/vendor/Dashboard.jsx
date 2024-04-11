import { useGetVendorUnansweredQuery } from "../../Redux/api/vendorQuestionsApi";
import { DownChevIcon } from "../../utils/Icons";
import { Disclosure, Transition } from "@headlessui/react";
import QuestionList from "./QuestionList";
const Dashboard = () => {
  const { data: questions } = useGetVendorUnansweredQuery();
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl md:text-2xl font-bold leading-9 pb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 pb-4 text-white font-semibold">
        <div className="flex justify-center">
          <div className="w-64 h-56 rounded-lg bg-red-300 flex flex-col justify-center items-center gradient-violet">
            <span className="text-4xl tracking-wider">20</span>Total Orders
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-56 rounded-lg bg-red-300 flex flex-col justify-center items-center gradient-blue">
            <span className="text-4xl tracking-wider">40</span>Total Favs
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-56 rounded-lg bg-red-300 flex flex-col justify-center items-center gradient-orange">
            <span className="text-4xl tracking-wider">18</span>Total Reviews
          </div>
        </div>
      </div>
      <hr className="bg-gray-200 h-[2px] w-full " />
      <div className="pl-4">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "" : "border-b-2"
                } w-full pb-4 border-gray-200/50`}
              >
                <span className="text-lg font-semibold flex items-center gap-2 ">
                  <span className={`${!open ? "" : "rotate-180 transform"}`}>
                    <DownChevIcon />
                  </span>
                  Unanswered Questions
                </span>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform -translate-y-6 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-6 opacity-0"
              >
                <Disclosure.Panel className="lg:pl-8 w-full">
                  {questions?.length == 0 ? (
                    <div className="py-8 flex justify-center items-center text-xl font-semibold">
                      No unanswered questions
                    </div>
                  ) : (
                    <QuestionList questions={questions} />
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Dashboard;
