import { Disclosure, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { DownChevIcon } from "../../utils/Icons";
import { usePostAnswerMutation } from "../../Redux/api/vendorQuestionsApi";

/* eslint-disable react/prop-types */
const QuestionList = ({ questions }) => {
  const [postAnswer] = usePostAnswerMutation();
  return (
    <ul>
      <li className="p-4 border-b-2 grid grid-cols-12">
        <span className="text-gray-600">S.No.</span>
        <span className=" text-gray-700 font-semibold ">ProductId</span>
        <span className="col-span-7 text-gray-600 font-semibold text-balance italic">
          Question
        </span>
        <span className="col-span-2 text-gray-700 font-semibold">
          CustomerId
        </span>
      </li>
      {questions?.map(({ id, product, question, username, answers }, index) => (
        <Disclosure as={Fragment} key={id}>
          {({ open }) => (
            <li className="p-4 border-b-2 grid grid-cols-12 gap-y-8">
              <span className="text-gray-600">{index + 1}</span>
              <span className=" text-gray-700 font-semibold trans">
                {product}
              </span>
              <span className="px-2 col-span-7 text-gray-600 font-semibold text-balance italic">
                {question}
              </span>
              <span className="col-span-2 text-gray-700 font-semibold">
                By {username}
              </span>
              <Disclosure.Button>
                <span className={`${!open ? "" : "rotate-90 transform"}`}>
                  <DownChevIcon />
                </span>
              </Disclosure.Button>
              {answers.length == 0 ? null : (
                <div className="col-span-12 flex flex-col gap-2">
                  {answers.map((ans, index) => (
                    <span
                      key={ans.id}
                      className="px-2 text-gray-500 font-semibold text-balance"
                    >
                      <span className="text-black pr-4">
                        Answer{""} {index + 1} |
                      </span>
                      {ans.answer}
                    </span>
                  ))}
                </div>
              )}
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform -translate-y-6 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-6 opacity-0"
              >
                <Disclosure.Panel className="lg:pl-8 w-full">
                  <div className="flex gap-8 justify-start items-center col-span-12">
                    <span className="col-span-2 text-gray-700 font-semibold">
                      Answer:
                    </span>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const answer = e.target.answer.value;
                        postAnswer({ id, data: { answer } });
                      }}
                      className="flex gap-4 items-center"
                    >
                      <textarea
                        name="answer"
                        cols={80}
                        className="border-[3px] bg-gray-100 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className=" h-12 justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                      />
                    </form>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </li>
          )}
        </Disclosure>
      ))}
      {/* <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <span className={`${!open ? "" : "rotate-180 transform"}`}>
                <DownChevIcon />
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
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure> */}
    </ul>
  );
};

export default QuestionList;
