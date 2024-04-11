import { Disclosure, Transition } from "@headlessui/react";
import { DownChevIcon } from "../../utils/Icons";
import {
  useGetVendorQuestionsQuery,
  useGetVendorUnansweredQuery,
} from "../../Redux/api/vendorQuestionsApi";
import QuestionList from "./QuestionList";

const VendorQuestionPage = () => {
  const { data: questions } = useGetVendorQuestionsQuery();
  const { data: unanswered } = useGetVendorUnansweredQuery();
  // const questions = [
  //   {
  //     Qid: 1,
  //     ProductId: 123,
  //     question:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
  //     customerId: 123,
  //   },
  //   {
  //     Qid: 2,
  //     ProductId: 123,
  //     question:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
  //     customerId: 123,
  //   },
  //   {
  //     Qid: 3,
  //     ProductId: 123,
  //     question:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
  //     customerId: 123,
  //   },
  //   {
  //     Qid: 4,
  //     ProductId: 123,
  //     question:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
  //     customerId: 123,
  //   },
  //   {
  //     Qid: 5,
  //     ProductId: 123,
  //     question:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
  //     customerId: 123,
  //   },
  // ];
  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-bold leading-9 pb-2">
        Questions
      </h1>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "" : "border-b-2"
              } w-full py-4 border-gray-200/50 `}
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
                {unanswered?.length == 0 ? (
                  <div className="py-8 flex justify-center items-center text-xl font-semibold">
                    No unanswered questions
                  </div>
                ) : (
                  <QuestionList questions={unanswered} />
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "" : "border-b-2"
              } w-full py-4 border-gray-200/50`}
            >
              <span className="text-lg font-semibold flex items-center gap-2 ">
                <span className={`${!open ? "" : "rotate-180 transform"}`}>
                  <DownChevIcon />
                </span>
                All Questions
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
  );
};

export default VendorQuestionPage;
