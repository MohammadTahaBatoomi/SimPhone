import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
      <div className="mb-6">
        <img
          src="/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.webp"
          className="w-30 h-30"
          alt="appele_logo"
        />
      </div>
      <div className="w-1/6 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-white loading-bar"></div>
      </div>

      <style>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
        .loading-bar {
          animation: loading 35s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default Loading;
