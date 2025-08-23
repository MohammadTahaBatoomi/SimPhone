"use client";

import React, { useState, useEffect } from 'react';

function AddressInput({ onSaved }) {
  const [address, setAddress] = useState('');

  // بارگذاری مقدار اولیه از LocalStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('address', address);
    if (onSaved) onSaved(address);
    alert("Address saved!");
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-black text-white p-4 gap-6">
      <img
        src="/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.webp"
        className="w-32 h-32"
        alt="apple_logo"
      />


      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="w-full max-w-[350px] p-3 rounded-lg bg-black text-white border border-white focus:outline-none focus:ring-1 focus:ring-white"
      />

      <button
        onClick={handleSave}
        className="w-full max-w-[350px] p-3 bg-white text-black rounded-lg hover:bg-gray-300 transition"
      >
        Save Address
      </button>
    </div>
  );
}

export default AddressInput;

