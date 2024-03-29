
import { useSelector } from "react-redux";
import {DownArrowIcon} from '../utils/Icons'
import BannerImage from '../utils/BannerImage.jsx'

// eslint-disable-next-line react/prop-types
const Banner = ({scroll}) => {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="w-full relative h-[70vh] px-10 bg-darker flex justify-center lg:justify-between text-white  ">
      <div className="space-y-10 p-2  flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-3xl md:text-4xl p-2  font-extrabold tracking-widest leading-9 text-slate-300">
          Hi,<span className="font-bold tracking-wider text-gray-400 bg-gradient-to-r from-gray-300 to-slate-500 inline-block p-1 text-transparent bg-clip-text bg-300% animate-gradient">{username}</span>
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-widest bg-gradient-to-bl from-blue-600 via-blue-400 to-indigo-700 inline-block p-2 text-transparent bg-clip-text bg-300% animate-gradient">
          Let{`'`}s Do Shopping
        </h1>
      </div>
      <div className="hidden pr-4 lg:flex lg:justify-center lg:items-center ">
        
      <BannerImage/>
      </div>
      <button className='absolute bottom-4 left-[46%] md:left-[48%] p-2 bg-white rounded-full text-black animate-bounce' onClick={()=>scroll()}>
        <DownArrowIcon/>
      </button>
    </div>
  );
};

export default Banner;
