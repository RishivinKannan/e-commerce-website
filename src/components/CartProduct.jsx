import {DeleteIcon} from '../utils/Icons.jsx'

export default function CartProduct(){

    return(
          <div className="py-4 px-3 flex flex-col gap-4 md:flex-col lg:flex-row rounded-lg bg-gray-50 ">
            <div className="flex gap-2">
              <img
                src={
                  "http://assets.myntassets.com/v1/images/style/properties/76d6c7b68001277c4f9298b1fd18be47_images.jpg"
                }
                className="min-w-20 min-h-20 max-20 max-h-20 rounded-lg shadow-2xl lg:max-w-28 lg:max-h-28 lg:min-w-28 lg:min-h-28"
              />
              <div className=" flex flex-col flex-wrap justify-around  ">
                <h2 className="text-lg lg:text-xl leading-5 font-semibold sm:tracking-wider lg:tracking-widest pl-2 md:min-w-80">
                  Nike Men Ballista II White Sports Shoes
                </h2>
                <span className="text-xl pl-2 font-extrabold tracking-widest text-gray-900">
                  ₹200
                </span>
              </div>
            </div>
            <div className="p-2 flex lg:flex-col justify-between lg:items-end flex-row-reverse items-center">
              <button><DeleteIcon/></button>
              <div className='flex rounded outline outline-1 outline-slate-200'>
                <button className=' bg-slate-200 w-7 h-7 rounded-l'>-</button>
                <span className='w-7 text-center text-lg font-semibold'>2</span>
                <button className='bg-slate-200 w-7 h-7 rounded-r'>+</button>
              </div>
            </div>
          </div>
    )
}
