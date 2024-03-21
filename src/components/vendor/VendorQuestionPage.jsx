import { Disclosure, Transition } from "@headlessui/react";
import { DownChevIcon } from "../../utils/Icons";

const VendorQuestionPage = () => {
  const questions = [
    {
      Qid: 1,
      ProductId: 123,
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
      customerId: 123,
    },
    {
      Qid: 2,
      ProductId: 123,
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
      customerId: 123,
    },
    {
      Qid: 3,
      ProductId: 123,
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
      customerId: 123,
    },
    {
      Qid: 4,
      ProductId: 123,
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
      customerId: 123,
    },
    {
      Qid: 5,
      ProductId: 123,
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid nisi laborum est fugiat qui magni suscipit porro mollitia ab ut consequuntur alias amet ipsum, deleniti asperiores possimus eos pariatur.",
      customerId: 123,
    },
  ];
  return (
    <div className="p-4">
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
                <ul>
                  <li className="p-4 border-b-2 grid grid-cols-12">
                    <span className="text-gray-600">S.No.</span>
                    <span className="col-span-2 text-gray-700 font-semibold ">
                      ProductId
                    </span>
                    <span className="col-span-7 text-gray-600 font-semibold text-balance italic">
                      Question
                    </span>
                    <span className="col-span-2 text-gray-700 font-semibold">
                      CustomerId
                    </span>
                  </li>
                  {questions.map(
                    ({ Qid, ProductId, question, customerId }, index) => (
                      <li
                        className="p-4 border-b-2 grid grid-cols-12"
                        key={Qid}
                      >
                        <span className="text-gray-600">{index + 1}</span>
                        <span className="col-span-2 text-gray-700 font-semibold trans">
                          {ProductId}
                        </span>
                        <span className="col-span-7 text-gray-600 font-semibold text-balance italic">
                          {question}
                        </span>
                        <span className="col-span-2 text-gray-700 font-semibold">
                          By {customerId}
                        </span>
                      </li>
                    )
                  )}
                </ul>
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
                <ul>
                  <li className="p-4 border-b-2 grid grid-cols-12">
                    <span className="text-gray-600">S.No.</span>
                    <span className="col-span-2 text-gray-700 font-semibold ">
                      ProductId
                    </span>
                    <span className="col-span-7 text-gray-600 font-semibold text-balance italic">
                      Question
                    </span>
                    <span className="col-span-2 text-gray-700 font-semibold">
                      CustomerId
                    </span>
                  </li>
                  {questions.map(
                    ({ Qid, ProductId, question, customerId }, index) => (
                      <li
                        className="p-4 border-b-2 grid grid-cols-12"
                        key={Qid}
                      >
                        <span className="text-gray-600">{index + 1}</span>
                        <span className="col-span-2 text-gray-700 font-semibold trans">
                          {ProductId}
                        </span>
                        <span className="col-span-7 text-gray-600 font-semibold text-balance italic">
                          {question}
                        </span>
                        <span className="col-span-2 text-gray-700 font-semibold">
                          By {customerId}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default VendorQuestionPage;
