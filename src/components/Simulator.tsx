"use client";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";

export default function Simulator() {
  const [isLoading, setIsLoading] = useState(true);
const [address, setAddress] = useState<string | null>(null);
  const MAX_LOADING_TIME = 10000;

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, MAX_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-[420px] h-[890px] rounded-[60px] border-[14px] border-black bg-white overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[22px] z-10" />
        <div className="absolute right-[-17px] top-[180px] w-[10px] h-[100px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1] cursor-pointer" />
        <div className="absolute left-[-17px] top-[120px] w-[10px] h-[40px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1] cursor-pointer" />
        <div className="absolute left-[-17px] top-[180px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1] cursor-pointer" />
        <div className="absolute left-[-17px] top-[250px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] z-[-1] cursor-pointer" />
        <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[6px] bg-[#525253] rounded-[3px] opacity-80 cursor-pointer" />

        {address && (
          <iframe
            className={`sim-iframe mt-8.5 w-full h-full border-none rounded-b-[48px] overflow-hidden ${
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
    </div>
  );
}
