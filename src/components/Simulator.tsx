"use client";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import IframeWrapper from "./IframeWrapper";
import StatusBar from "./StatusBar";

export default function Simulator() {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [themeColor, setThemeColor] = useState<string>("#999995");
  const MAX_LOADING_TIME = 10000;

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) setAddress(savedAddress);

    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) setThemeColor(savedColor);

    const timer = setTimeout(() => setIsLoading(false), MAX_LOADING_TIME);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const askForColor = () => {
    const input = window.prompt(
      "کد رنگ را وارد کنید",
      themeColor
    );
    if (!input) return;
    const value = input.trim();
    const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    const rgbRegex = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
    if (hexRegex.test(value) || rgbRegex.test(value)) {
      setThemeColor(value);
      localStorage.setItem("themeColor", value);
    } else {
      alert("فرمت رنگ نامعتبر است.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-[420px] h-[890px] rounded-[60px] border-[14px] border-black bg-black overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="absolute top-[7px] left-1/2 transform -translate-x-1/2 w-[130px] h-[35px] bg-black rounded-[22px] z-10 pointer-events-none" />

        <StatusBar time={time} bgColor={themeColor} onClick={askForColor} onDoubleClick={askForColor} />

        {address && (
          <IframeWrapper
            ref={iframeRef}
            address={address}
            isLoading={isLoading}
            onLoad={() => setIsLoading(false)}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-[48px] z-20">
            <Loading />
          </div>
        )}
      </div>

      <div className="absolute bottom-[65px] left-1/2 transform -translate-x-1/2 w-[130px] h-[6px] bg-[#525253] rounded-[3px] opacity-80" />
    </div>
  );
}
