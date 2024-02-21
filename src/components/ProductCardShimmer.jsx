
function ProductCardShimmer() {
  return (
    <div className='pr-1'>
        <div
          className=" bg-slate-200 animate-pulse py-4 px-5 flex flex-col gap-6 max-w-56 min-h-80 rounded-lg space-y-6  group"
        >
          <div className='relative z-0 w-44 h-44'>
            <div
              className="w-44 h-44 bg-slate-300/60 rounded-lg shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>
          <div className="space-y-2">
            <div className="bg-slate-300/60 w-4/6 leading-6 font-bold tracking-widest pl-1 text-wrap ">
            </div>
            <div className="inline-block bg-slate-300/60 w-2/6 text-lg pl-1 font-bold tracking-wider">
            </div>
            <div className="inline-block bg-slate-300/60 w-2/6 text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500">
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductCardShimmer