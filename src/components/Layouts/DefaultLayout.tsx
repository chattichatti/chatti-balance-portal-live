'use client';

import React, { ReactNode } from 'react';
import Sidebar from '@/components/Partials/Sidebar';
import Header from '@/components/Partials/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F4F7FF] text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
