/* eslint-disable react/prop-types */
import {Rating} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function ProductCart ({imageUrl,title,category,rating = 3,mrp = "300",price = "200"}) {

    return(
        <div className="py-4 px-5 flex flex-col gap-6 w-52 h-80 rounded-lg ">
                <img src={imageUrl} className="w-44 h-44 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"/>
                <div>
                <h2 className=" leading-6 font-bold tracking-widest pl-1 text-wrap">{title}</h2>
                    <span className="text-xs tracking-widest font-medium pl-1 ">{category}</span>
                    <Rating  value={rating} readOnly className='w-28 py-1 z-0'/>
                    <span className='text-lg pl-1 font-bold tracking-wider'>₹{price}</span>
                    <span className='text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500'>₹{mrp}</span>
                </div>
        </div>

    )
}