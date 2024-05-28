"use client";
import React from "react";

import Search from "@/components/Search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-[80%] px-3 mx-auto">
        <Search />
      </div>
    </main>
  );
}
