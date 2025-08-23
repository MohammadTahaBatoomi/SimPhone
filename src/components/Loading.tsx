import React from "react";
import Image from 'next/image';

function Loading({ duration = 5 }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-2xl bg-black">
      <div className="mb-6">
        <Image
          src="/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.webp"
          width={128}
          height={128}
          alt="apple_logo"
        />
      </div>

      <div className="w-3/6 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-white loading-bar"
          style={{
            animation: `loading ${duration}s linear forwards`,
          }}
        ></div>
      </div>

      <style>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default Loading;
