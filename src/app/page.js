"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">🎯 PollView</h1>
        <p className="text-gray-600 mb-8">참여하고 결과를 확인해보세요!</p>
        <div className="space-y-4">
          <Link
            href="/survey"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            📋 설문 참여
          </Link>
          <Link
            href="/statistic"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            📊 통계 보기
          </Link>
        </div>
      </div>
    </main>
  );
}