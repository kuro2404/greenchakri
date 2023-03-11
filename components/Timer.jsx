import { useState, useEffect, useContext } from "react";
import React from "react";
import { DataContext } from "@/store/GlobalState";
import ResultsTable from '../components/ResultsTable'

export default function Time() {
    const [time, setTime] = useState(new Date());
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const nextToDraw = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        time.getMinutes() + 1,
        0,
        0
    );

    const timeDiff = Math.floor((nextToDraw - time) / 1000);
    const seconds = timeDiff % 60;
    const timeToDraw = `${seconds.toString().padStart(2, "0")}`;
    const nextToDrawtime = nextToDraw.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="lg:text-2xl ml-[80%] mt-[3%]   absolute ">
        <div className=" border-2 flex border-white  overflow-hidden w-full mt-auto rounded-lg text-center ">
        <img src="/account.png" className="h-[20%]  w-[20%]" />
        {/* <h1 className="text-white my-auto ml-auto mr-auto font-bold">{auth.user.userName.substring(0, 7)}</h1> */}   
        <h1 className="text-white my-auto ml-auto mr-auto font-bold">{auth.user?.userName.substring(0, 7)}</h1>

         </div>
        <div className=" mt-[11%] ml-[51%] ">
            <div className="flex justify-center  mr-0 items-center bg-red-500 border-2 border-white rounded-full w-8 h-8 lg:h-24 lg:w-24  text-white font-bold ">
                <p className="text-white text-center -200 lg:text-5xl  flex  items-center">
                    {timeToDraw}     
                </p>
            </div>
        </div>



        
        </div>
    );
}
