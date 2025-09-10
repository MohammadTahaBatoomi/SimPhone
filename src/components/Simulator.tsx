"use client";
import React, { useState, useEffect } from "react";
import { IoBatteryFullOutline } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { TbAntennaBars5 } from "react-icons/tb";
import Loading from "./Loading";

export default function Simulator() {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const MAX_LOADING_TIME = 10000;

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) setAddress(savedAddress);

    const timer = setTimeout(() => setIsLoading(false), MAX_LOADING_TIME);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-[420px] h-[890px] rounded-[60px] border-[14px] border-black bg-black overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        {/* Notch */}
        <div className="absolute top-[7px] left-1/2 transform -translate-x-1/2 w-[130px] h-[35px] bg-black rounded-[22px] z-10" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between py-3.5 px-4 text-black bg-white font-bold text-[15px] z-5">
          <div className="ml-8 font-sans">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div className="flex items-center space-x-1.5 text-black text-xl font-bold font-sans mr-3">
            <TbAntennaBars5 />
            <IoIosWifi />
            <IoBatteryFullOutline />
          </div>
        </div>

        {/* iframe wrapper */}
        {address && (
          <div className="w-full h-full relative overflow-hidden rounded-b-[48px] mt-[50px]">
            <iframe
              className={`sim-iframe absolute top-0 left-[-22px] w-[calc(100%+30px)] pb-20 h-[calc(100%+30px)] border-none rounded-b-[48px] ${
                isLoading ? "hidden" : ""
              }`}
              src={address}
              title="Device Preview"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-[48px] z-20">
            <Loading />
          </div>
        )}
      </div>

      {/* Bottom indicators */}
      <div className="absolute bottom-[65px] left-1/2 transform -translate-x-1/2 w-[130px] h-[6px] bg-[#525253] rounded-[3px] opacity-80" />

      {/* Scrollbar مخفی */}
      <style jsx global>{`
        .sim-iframe::-webkit-scrollbar {
          display: none;
        }
        .sim-iframe {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
