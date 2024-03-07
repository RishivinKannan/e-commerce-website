import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { useSelector } from "react-redux";
import WriteReviewDialog from "./Header/WriteReviewDialog";
import Welcome from '../assets/welcome2.mp3'

export const SpecsPanel = () => {
  return <div>SpecsPanel</div>;
};

export const ReviewPanel = () => {
  const [dialog, setDialog] = useState(false);
  const [audio, setAudio] = useState(false);
  const addReview = (value, rating) => {
    console.log(value, rating);
    setDialog(false);
    setAudio(true);
  };
  const { isLogged } = useSelector((state) => state.user);

  const reviews = [
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
          {reviews.map(({ id, username, review, rating }) => (
            <div key={id} className="p-1 space-y-2 ">
              <h1 className="font-semibold tracking-wide">{username}</h1>
              <Rating value={rating} readOnly className="max-w-28 z-0" />
              <p>{review}</p>
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
  return <div>QandAPanel</div>;
};
