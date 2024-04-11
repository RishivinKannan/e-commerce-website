/* eslint-disable react/prop-types */
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { useSelector } from "react-redux";
import WriteReviewDialog from "./WriteReviewDialog";
import WriteQuestionDialog from "./WriteQuestionDialog";
import Welcome from "../assets/welcome2.mp3";
import {
  useGetReviewsQuery,
  usePostReviewMutation,
  useGetQuestionsQuery,
  usePostQuestionMutation,
} from "../Redux/api/productApi";
import { useParams } from "react-router-dom";

export const SpecsPanel = ({ spec = [] }) => {
  const specs =
    spec.length != 0
      ? spec
      : [
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            specName: "Specification Name",
            specDetail:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ];

  return (
    <div className="w-full space-y-6 p-4 px-6">
      <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
        Product Specification
      </span>
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
        {specs.map(({ specName, specDetail }, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-3 border-black border p-2 py-4 rounded"
          >
            <span className="flex justify-center items-center px-2 border-r-2 border-black font-semibold text-gray-500">
              {specName}
            </span>
            <span className="flex items-center px-2 pl-4 col-span-2 font-semibold text-slate-700">
              {specDetail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReviewPanel = () => {
  const [dialog, setDialog] = useState(false);
  const [audio, setAudio] = useState(false);
  const { id } = useParams();
  const [postReview, data] = usePostReviewMutation();
  const { data: review, isLoading } = useGetReviewsQuery(id);
  console.log(JSON.stringify(data));
  const addReview = (review, rating) => {
    console.log(review, rating);
    postReview({ id, data: { review, rating } });
    setDialog(false);
    setAudio(true);
  };
  const { isLogged } = useSelector((state) => state.user);

  const reviews =
    !isLoading && review?.length != 0
      ? review?.toReversed()
      : [
          {
            id: 1,
            username: "Emily Selman",
            rating: 4,
            review:
              "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
          },
          {
            id: 2,
            username: "Emily Selman",
            rating: 1,
            review:
              "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
          },
          {
            id: 3,
            username: "Emily Selman",
            rating: 2,
            review:
              "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
          },
        ];
  return (
    <>
      {audio ? <audio src={Welcome} autoPlay /> : ""}
      <div className="w-full p-2 md:px-6">
        <div className="flex justify-between items-center mb-4 ">
          <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
            Customer Reviews
          </span>
          <button
            className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
            onClick={() => {
              !isLogged ? alert("Please Login first to write a review") : null;
              setDialog(true);
            }}
          >
            Write Review
          </button>
        </div>
        <div className="space-y-2 w-full md:w-10/12">
          {reviews?.map(({ id, username, review, rating }) => (
            <div key={id} className="p-1 space-y-2 ">
              <h1 className="pl-1 font-semibold tracking-wide">{username}</h1>
              <Rating value={rating} readOnly className="max-w-28 z-0" />
              <p className="pl-1 text-lg tracking-wide">{review}</p>
              <div>
                <hr className="bg-gray-200 h-[2px] w-full mt-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <WriteReviewDialog open={dialog} close={setDialog} submit={addReview} />
    </>
  );
};

export const QandAPanel = () => {
  const [dialog, setDialog] = useState(false);
  const [audio, setAudio] = useState(false);
  const { id } = useParams();
  const [postQuestion] = usePostQuestionMutation();
  const { data: question, isLoading } = useGetQuestionsQuery(id);
  const addQuestion = (question) => {
    postQuestion({ id, data: { question } });
    setDialog(false);
    setAudio(true);
  };
  const { isLogged } = useSelector((state) => state.user);

  const questions =
    !isLoading && question?.length != 0
      ? question.toReversed()
      : [
          {
            id: 1,
            username: "Emily Selman",
            question:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit omnis mollitia delectus in, ducimus eveniet exercitationem. Quaerat reprehenderit iure omnis laudantium, earum natus deserunt, eos debitis quae quis sit ex!",
            answers: [
              {
                id: 1,
                answer:
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit omnis mollitia delectus in, ducimus eveniet exercitationem. Quaerat reprehenderit iure omnis laudantium, earum natus deserunt, eos debitis quae quis sit ex!",
              },
            ],
          },
        ];
  return (
    <>
      {audio ? <audio src={Welcome} autoPlay /> : ""}
      <div className="w-full p-2 md:px-6">
        <div className="flex justify-between items-center mb-4 ">
          <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
            Frequently asked question
          </span>
          <button
            className="w-44 md:w-56 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
            onClick={() => {
              !isLogged ? alert("Please Login first to write a review") : null;
              setDialog(true);
            }}
          >
            Ask a Question
          </button>
        </div>
        <div className="space-y-2 w-full md:w-10/12">
          {questions.map(({ id, username, question, answers }) => (
            <div key={id} className="p-1 space-y-2 ">
              <p className="font-semibold tracking-wide text-gray-500">
                Q: {question}
              </p>
              <h1 className=" tracking-wide text-gray-500 text-sm">
                By {username}
              </h1>
              {answers.length != 0 ? (
                answers.map((ans, index) => (
                  <p key={ans.id}>
                    {index + 1} | {ans.answer}
                  </p>
                ))
              ) : (
                <p>Yet to answer</p>
              )}
              <div>
                <hr className="bg-gray-200 h-[2px] w-full mt-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <WriteQuestionDialog
        open={dialog}
        close={setDialog}
        submit={addQuestion}
      />
    </>
  );
};
