"use client";
import React, { useState, useEffect } from 'react';
import Simulator from '@/components/Simulator';
import AddressInput from '@/components/AddressInput';

export default function Page() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  return (
    <>
      {address ? <Simulator /> : <AddressInput />}
    </>
  );
}
