"use client";
import React from "react";
import { IoBatteryFullOutline } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { TbAntennaBars5 } from "react-icons/tb";

interface StatusBarProps {
  time: Date;
  bgColor?: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
}

export default function StatusBar({ time, bgColor = "#000000", onDoubleClick, onClick }: StatusBarProps) {
  const getTextColor = (bgColor: string) => {
    let r, g, b;
    if (bgColor.startsWith('#')) {
      const hex = bgColor.replace('#', '');
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    } else if (bgColor.startsWith('rgb')) {
      const matches = bgColor.match(/\d+/g);
      if (matches) {
        [r, g, b] = matches.map(Number);
      } else {
        return "black";
      }
    } else {
      return "black";
    }
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "black" : "white";
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 flex justify-between py-3.5 px-4 font-bold text-[15px] z-5"
      style={{ 
        backgroundColor: bgColor, 
        color: getTextColor(bgColor),
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="ml-8 font-sans text-[16px]">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>

      <div className="flex items-center space-x-1.5 text-[20px] font-bold font-sans mr-3">
        <TbAntennaBars5 />
        <IoIosWifi />
        <IoBatteryFullOutline />
      </div>
    </div>
  );
}
