"use client";
import React, { useEffect, useState } from "react";

interface OrderNowFabProps {
  shopUrl: string;
}

const OrderNowFab: React.FC<OrderNowFabProps> = ({ shopUrl }) => {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowFab(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!shopUrl || !showFab) return null;

  return (
    <a
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl font-bold text-lg flex items-center gap-2 animate-bounce transition-all duration-300 lg:hidden"
      style={{ minWidth: 0 }}
    >
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      Order Now
    </a>
  );
};

export default OrderNowFab; 