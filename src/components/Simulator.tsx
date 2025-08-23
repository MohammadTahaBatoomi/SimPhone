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
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180px] h-[35px] bg-black rounded-b-[22px] z-10" />
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-[13px] text-black bg-white font-bold text-[15px] z-5">
          <div className="ml-6 font-sans">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div className="flex items-center space-x-1 text-black text-xl font-bold font-sans mr-3">
            <TbAntennaBars5 />
            <IoIosWifi />
            <IoBatteryFullOutline />
          </div>
        </div>

        {/* iframe */}
        {address && (
          <iframe
            className={`sim-iframe mt-[42px] w-full h-full border-none rounded-b-[48px] ${
              isLoading ? "hidden" : ""
            }`}
            src={address}
            title="Device Preview"
            onLoad={() => setIsLoading(false)}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-[48px] z-20">
            <Loading />
          </div>
        )}
      </div>

      <div className="absolute right-[calc(50%-210px-5px)] top-[180px] w-[10px] h-[100px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1]" />
      <div className="absolute left-[calc(50%-210px-5px)] top-[120px] w-[10px] h-[40px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1]" />
      <div className="absolute left-[calc(50%-210px-5px)] top-[180px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1]" />
      <div className="absolute left-[calc(50%-210px-5px)] top-[250px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1]" />

      <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 w-[120px] h-[6px] bg-[#525253] rounded-[3px] opacity-80" />

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
