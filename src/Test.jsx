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
        <div className=" w-screen h-screen">
            <div className="py-4 px-2 flex lg:w-7/12 rounded-lg bg-red-200 ">
                <img src={"http://assets.myntassets.com/v1/images/style/properties/76d6c7b68001277c4f9298b1fd18be47_images.jpg"} className="w-20 h-20 rounded-lg shadow-xl lg:w-24 h-24"/>
                <div className='p-2 flex flex-col justify-around  bg-gray-500'>
                    <h2 className="text-lg leading-4 font-semibold tracking-widest pl-1">Nike Men Ballista II White Sports Shoes</h2>
                    <span className='text-xl pl-1 font-extrabold tracking-widest text-gray-900'>₹200</span>
                </div>
                <div className="p-2 flex flex-col justify-around items-end">


                </div>

            </div>
           
        </div>
         
        </>
    )
}