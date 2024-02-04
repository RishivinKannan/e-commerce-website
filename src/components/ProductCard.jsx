/* eslint-disable react/prop-types */
import {Rating} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function ProductCard ({imageUrl,title,rating = 3,mrp = "300",price = "200",...otherProps}) {

    return(
        <div  >
        <div {...otherProps} className="py-4 px-5 flex flex-col gap-6 max-w-64 min-h-80 rounded-lg space-y-6">
                <img src={imageUrl} className="w-44 h-44 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"/>
                <div className='space-y-2'>
                    <h2 className=" leading-6 font-bold tracking-widest pl-1 text-wrap ">{title}</h2>
                    <Rating  value={rating} readOnly className='w-28 py-1 z-0'/>
                    <span className='text-lg pl-1 font-bold tracking-wider'>₹{price}</span>
                    <span className='text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500'>₹{mrp}</span>
                </div>
        </div>
        </div>
    )
}