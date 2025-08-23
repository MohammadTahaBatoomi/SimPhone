"use client";

import React, { useState, useEffect } from 'react';
import Simulator from '@/components/Simulator';
import AddressInput from '@/components/AddressInput';

export default function Page() {
const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }

    const interval = setInterval(() => {
      const current = localStorage.getItem('address');
      if (current !== address) {
        setAddress(current);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [address]);

  return (
    <>
      {address ? <Simulator /> : <AddressInput />}
    </>
  );
}
