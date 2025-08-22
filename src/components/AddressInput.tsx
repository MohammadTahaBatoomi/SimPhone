"use client"

import React, { useState, useEffect } from 'react';

function AddressInput() {
  const [address, setAddress] = useState('');

  // بارگذاری مقدار اولیه از LocalStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('address', address);
  }, [address]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-black text-white p-4">
      <img
        src="/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.webp"
        className="w-30 h-30"
          alt="appele_logo"
      />

      {/* Input */}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="w-full max-w-md p-3 rounded-lg bg-black text-white border border-whith focus:outline-none focus:ring-1 focus:ring-white"
      />
    </div>
  );
}

export default AddressInput;
