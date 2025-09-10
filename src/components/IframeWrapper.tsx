"use client";
import React from "react";

interface IframeWrapperProps {
  address: string;
  isLoading: boolean;
  onLoad: () => void;
}

export default function IframeWrapper({ address, isLoading, onLoad }: IframeWrapperProps) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-b-[48px] mt-[50px]">
      <iframe
        className={`sim-iframe absolute top-0 left-[-22px] w-[calc(100%+30px)] pb-20 h-[calc(100%+30px)] border-none rounded-b-[48px] ${
          isLoading ? "hidden" : ""
        }`}
        src={address}
        title="Device Preview"
        onLoad={onLoad}
      />
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
