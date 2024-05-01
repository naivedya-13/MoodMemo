import React from 'react';
import Img from './header';
import InputBox from "./InputBox"

const Body = () => {
  return (
    <>
   
    <div className="h-screen bg-gray-200 flex justify-center items-center  p-2 " >

        <div className="border border-black p-4  bg-cyan-50">
        <h1 className="text-blue-300 flex justify-center mb-2 font-bold"> Hey Champ!!</h1>
        <Img/>
        <div className="flex flex-col gap-4">

            <InputBox/>

        </div>
 </div>
        
        </div>
        </>
  )
}

export default Body;