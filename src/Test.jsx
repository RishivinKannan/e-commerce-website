import { useDispatch, useSelector } from "react-redux";
import {userlogin,userlogout} from './Redux/services/userSlice'
export default function Test() {
  const { username, email, isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="h-screen flex justify-center items-center gap-8">
        <h1 className="text-4xl">{username}</h1>
        <h1 className="text-4xl">{email }</h1>
        <h1 className="text-4xl">{isLogged.toString()}</h1>
        <button onClick={()=>dispatch(userlogin({username:'rishi',email:'rishi@gmail.com'}))}>login</button>
        <button onClick={()=>dispatch(userlogout())}>logout</button>
      </div>
    </>
  );
}
