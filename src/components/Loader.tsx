"use client"; // Enable client-side rendering for animations

import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {/* Loader Container */}
      <div className="w-48 h-48 relative overflow-hidden rounded-lg">
        {/* First Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{ backgroundImage: "url('/images/black.jpg')" }}
        ></div>
        {/* Second Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeInAndOut"
          style={{ backgroundImage: "url('/images/orange.jpg')" }}
        ></div>
      </div>
      {/* Loading Text Below */}
      <div className="text-white text-lg mt-4">Loading..</div>
    </div>
  );
};

export default Loader;
