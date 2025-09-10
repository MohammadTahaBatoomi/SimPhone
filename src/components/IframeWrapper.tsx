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
          className={`absolute top-0 left-[-22px] w-[calc(100%+30px)] pb-20 h-[calc(100%+30px)] border-none rounded-b-[48px] ${
            isLoading ? "hidden" : ""
          }`}
          src={address}
          title="Device Preview"
          onLoad={onLoad}
        />
      </div>
    );
  }
);

IframeWrapper.displayName = "IframeWrapper";
export default IframeWrapper;
