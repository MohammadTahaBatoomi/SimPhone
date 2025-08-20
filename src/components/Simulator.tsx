"use client"

import React from "react";

export default function Simulator() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative w-[420px] h-[890px] rounded-[60px] border-[14px] border-black bg-black overflow-visible shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[22px] z-10" />

        <div className="absolute right-[-17px] top-[180px] w-[10px] h-[100px] bg-[#424242] rounded-[4px] border border-[#424242] transition-all duration-300 ease-300 z-[-1] cursor-pointer" />

        <div className="absolute left-[-17px] top-[120px] w-[10px] h-[40px] bg-[#424242] rounded-[4px] border border-[#424242] transition-all duration-300 ease-300 z-[-1] cursor-pointer" />

        <div className="absolute left-[-17px] top-[180px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] transition-all duration-300 ease-300 z-[-1] cursor-pointer" />

        <div className="absolute left-[-17px] top-[250px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] transition-all duration-300 ease-300 z-[-1] cursor-pointer" />

        <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[6px] bg-[#525253] rounded-[3px] opacity-80 transition-all duration-300 ease-300 cursor-pointer" />

        {/* iframe - full screen of the device with rounded inner corners */}
        <iframe
          className="sim-iframe w-full h-full border-none rounded-[48px] overflow-hidden"
          src="https://sabzlearn.ir/"
          title="Device Preview"
          style={{ scrollbarWidth: "none" }}
        />

        {/* hide scrollbars for webkit browsers and ensure iframe fills its container */}
        <style jsx global>{`
          .sim-iframe::-webkit-scrollbar { display: none; }
          .sim-iframe { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
}
