"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AddressInputProps {
  onSaved?: (address: string) => void;
}

function AddressInput({ onSaved }: AddressInputProps) {
  const [address, setAddress] = useState<string>('');

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
      <Image
        src="/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.webp"
        width={128}
        height={128}
        alt="apple_logo"
        className="rounded-full"
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
