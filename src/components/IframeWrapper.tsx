"use client";
import React, { forwardRef } from "react";

interface IframeWrapperProps {
  address: string;
  isLoading: boolean;
  onLoad: () => void;
}

const IframeWrapper = forwardRef<HTMLIFrameElement, IframeWrapperProps>(
  ({ address, isLoading, onLoad }, ref) => {
    return (
      <div className="w-full h-full relative overflow-hidden rounded-b-[48px] mt-[50px]">
        <iframe
          ref={ref}
          className={`sim-iframe absolute top-0 left-[-22px] w-[calc(100%+30px)] pb-20 h-[calc(100%+30px)] border-none rounded-b-[48px] ${
            isLoading ? "hidden" : ""
          }`}
          src={address}
          title="Device Preview"
          onLoad={onLoad}
        />
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
);

IframeWrapper.displayName = "IframeWrapper";
export default IframeWrapper;
