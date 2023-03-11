import HeaderText from "@/components/HeaderText";
import { DataContext } from "@/store/GlobalState";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import HandleResults from "../components/HandleResults";
import Wheel from "../components/Wheel";
import axios from "axios";
import Timer from "../components/Timer";
import Timerleft from "../components/Timerleft";
import { Howl } from "howler";
import ResultsTable from "@/components/ResultsTable";
import ImageCarousel from "../components/ImageCarousel";

function game() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [couponNum, setCouponNum] = useState();
  const [mustSpin, setMustSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");

  const wheelSound = new Howl({
    src: ["/wheel.mp3"],
  });

  const winningSound = new Howl({
    src: ["/winning.mp3"],
  });

  const timeRemainingSound = new Howl({
    src: ["/5sec.mp3"],
  });

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
  const nextToDrawtime = nextToDraw.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // useEffect(() => {

  //     const fetchWinningNumber = async () => {
  //       try {
  //         const response = await axios.get(`/api/getWinningNumber/?drawTime=${nextToDrawtime}`);
  //         setCouponNum(response.data.couponNum);
  //       } catch (err) {
  //         console.log('Error fetching winning number:', err);
  //       }
  //     };
  //     fetchWinningNumber();
  //     console.log(winningNumber)
  //   }
  // );

  useEffect(() => {
    const fetchWinningNumber = async () => {
      if (timeToDraw) {
        // Only fetch data when there are 5 seconds or less until the next draw
        try {
          const response = await axios.get(
            `/api/getWinningNumber/?drawTime=${nextToDrawtime}`
          );
          setCouponNum(response.data.couponNum);
          console.log(response.data.couponNum, "this is fetched result");
        } catch (err) {
          console.log("Error fetching winning number:", err);
        }
      }
    };
    const timer = setInterval(() => {
      fetchWinningNumber();
    }, 1000);

    return () => clearInterval(timer);
  }, [nextToDrawtime, timeToDraw]);

  const handleChange = () => {
    if (!spinning) {
      setSpinning(true);
      console.log(couponNum, "this is client side result");
      setMustSpin(true);
    }
  };
  let wheelSoundPlayed = false;
  let winningSoundPlayed = false;
  let timeRemainingSoundPlayed = false;

  function run() {
    if (timeToDraw == 0) {
      handleChange();
    }
    if (timeToDraw == 0 && !wheelSoundPlayed) {
      wheelSound.play();
      wheelSoundPlayed = true;
    }
    if (timeToDraw == 54 && !winningSoundPlayed) {
      winningSound.play();
      winningSoundPlayed = true;
    }
    if (timeToDraw == 5 && !timeRemainingSoundPlayed) {
      timeRemainingSound.play();
      timeRemainingSoundPlayed = true;
    }
  }

  run();

  return (
    <body className=" overflow-hidden  ">
      <video
        src="/video.mp4"
        className="absolute  w-screen"
        autoPlay={true}
        muted
        loop
      />
      <div className="h-screen w-screen absolute opacity-75 bg-black"></div>
      <div className="absolute w-full mt-[3%]">
        <HeaderText />
      </div>
      <div className="h-screen mt-[10%] w-screen absolute">
        <Head>
          <title>Chakri - Game</title>
        </Head>

        <div className="flex w-full absolute">
          <Timer />
          <div className="absolute rounded-lg text-white border-2 border-red-500 ml-[70%] lg:w-[30%] w-[20%] h-[20%] mt-[15%]">
            <h1 className="font-bold text-[8px] my-2 lg:text-2xl">
              For Amusement Purposes Only!
            </h1>
          </div>
          <div className="absolute ml-[70%] w-[1%] lg:w-full mt-[22%] lg:mt-[25%]">
            <ResultsTable />
          </div>
          <div className="ml-[0%] w-full ">
            <Timerleft />
          </div>
        </div>
        <div className="wheelcontainer realtive w-[30%] h-[33vw] relative top-[5px] left-[35.8%] object-contain">
          {/* madhale circle kaate */}
          <div className="absolute ml-[40%] mt-[44%] h-[19%] w-[19%]">
            <ImageCarousel />
          </div>
          <img
            src="https://res.cloudinary.com/dxcer6hbg/image/upload/v1675103735/uxo6d30fdtolymvu27kt.png"
            alt="button"
            onClick={() => handleChange()}
            style={{
              cursor: "pointer",
              position: "absolute",
              width: "33%",
              height: "33%",
              left: "33%",
              top: "33%",
              margin: "0 auto",

              zIndex: 3,
            }}
          />

          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={couponNum}
            onClick={() => handleChange()}
            onStopSpinning={() => {
              setSpinning(false);
              setMustSpin(false);
            }}
          />
          {/** bahercha circle */}
          <img
            src="https://res.cloudinary.com/dxcer6hbg/image/upload/v1675103737/lbxnxhwmktwln0fgowwv.png"
            style={{
              width: "100%",
              height: "100%",
              left: "0%",
              top: "-3%",

              position: "absolute",
            }}
          />
          <div className="absolute ">
            <ImageCarousel />
          </div>
        </div>
        <div
          style={{
            width: "100px",
            height: "100px",
            left: "1000px",
            top: "290px",
            position: "fixed",
          }}
        ></div>
      </div>
    </body>
  );
}

export default game;
