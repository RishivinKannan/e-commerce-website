import {Rating} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import axios from 'axios'
import { useEffect,useState } from 'react';

export default function Test (){
    const [products,setProducts]= useState([]);

    useEffect(()=>{
        fetchData()
    },[])

    async function fetchData (){
        axios.get("./Toppicks.json").then((res)=>setProducts(res.data)) ;
    }

    return (
        <>
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="py-4 px-5 flex flex-col gap-3 w-52 h-80 rounded-lg">
                <img src={"http://assets.myntassets.com/v1/images/style/properties/76d6c7b68001277c4f9298b1fd18be47_images.jpg"} className="w-44 h-44 rounded-lg shadow-xl"/>
                <div>
                    <h2 className="text-lg leading-4 font-bold tracking-widest pl-1">Flip Flop</h2>
                    <span className="text-xs tracking-widest font-medium pl-1 ">Footwear</span>
                    <Rating  value={4} readOnly className='w-28 py-1'/>
                    <span className='text-lg pl-1 font-bold tracking-wider'>₹200</span>
                    <span className='text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500'>₹300</span>
                </div>
            </div>
           
        </div>
         
        </>
    )
}