"use client";

import React, { useState } from "react"; // ✅ React를 함께 import
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const [type, setType] = useState(""); // 아침형/저녁형
  const [studyTime, setStudyTime] = useState(""); // 공부 시간

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !studyTime) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    const newEntry = { type, studyTime };
    const existing = JSON.parse(localStorage.getItem("surveyData") || "[]");
    existing.push(newEntry);
    localStorage.setItem("surveyData", JSON.stringify(existing));

    alert("설문이 저장되었습니다!");
    router.push("/PollView/statistic");
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 설문 조사</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 아침형/저녁형 선택 */}
        <div>
          <label className="block text-lg font-semibold mb-2">당신은 어떤 유형인가요?</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="type"
                value="morning"
                checked={type === "morning"}
                onChange={(e) => setType(e.target.value)}
              />
              <span className="ml-1">아침형</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="night"
                checked={type === "night"}
                onChange={(e) => setType(e.target.value)}
              />
              <span className="ml-1">저녁형</span>
            </label>
          </div>
        </div>

        {/* 공부 시간 선택 */}
        <div>
          <label className="block text-lg font-semibold mb-2">하루 평균 공부 시간은?</label>
          <select
            className="w-full p-2 border rounded"
            value={studyTime}
            onChange={(e) => setStudyTime(e.target.value)}
          >
            <option value="">-- 선택하세요 --</option>
            <option value="1~3시간">1~3시간</option>
            <option value="3~5시간">3~5시간</option>
            <option value="5~7시간">5~7시간</option>
            <option value="7~9시간">7~9시간</option>
            <option value="9~11시간">9~11시간</option>
            <option value="11~13시간">11~13시간</option>
            <option value="13시간 이상">13시간 이상</option>
          </select>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          제출하기
        </button>
      </form>
    </main>
  );
}