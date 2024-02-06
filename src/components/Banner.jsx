import { useContext } from "react";
import { UserDetailsContext } from "../App.jsx";
import BannerImage from '../utils/BannerImage.jsx'

const Banner = () => {
    const {username}=useContext(UserDetailsContext);
  return (
    <div className="w-screen h-[70vh] bg-darker grid grid-cols-1 lg:grid-cols-2 gap-6  lg:w-[98.7vw] text-white px-8 ">
      <div className="space-y-10 p-2 flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-3xl lg:text-4xl p-2 font-extrabold tracking-widest leading-9 text-slate-300">
          Hi,<span className="font-bold tracking-wider text-gray-400 bg-gradient-to-r from-gray-300 to-slate-400 inline-block p-1 text-transparent bg-clip-text bg-300% animate-gradient">{username}</span>
        </h1>
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-widest bg-gradient-to-bl from-blue-600 via-slate-400 to-indigo-400 inline-block p-2 text-transparent bg-clip-text bg-300% animate-gradient">
          Let{`'`}s Do Shopping
        </h1>
      </div>
      <div className="hidden w-full lg:flex lg:justify-center lg:items-center">
        
      <BannerImage/>
      </div>
    </div>
  );
};

export default Banner;
