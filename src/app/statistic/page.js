"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#0088FE", "#FF8042"];

export default function StatisticPage() {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    // 로컬스토리지에서 설문 데이터 불러오기
    const stored = localStorage.getItem("surveyData");
    if (stored) {
      setSurveyData(JSON.parse(stored));
    }
  }, []);

  // 아침형 vs 저녁형 분류
  const morningCount = surveyData.filter((d) => d.type === "morning").length;
  const nightCount = surveyData.filter((d) => d.type === "night").length;

  const pieData = [
    { name: "아침형", value: morningCount },
    { name: "저녁형", value: nightCount },
  ];

  // 공부 시간 카운트
  const studyGroups = [
    "1~3시간",
    "3~5시간",
    "5~7시간",
    "7~9시간",
    "9~11시간",
    "11~13시간",
    "13시간 이상",
  ];

  const barData = studyGroups.map((range) => ({
    name: range,
    count: surveyData.filter((d) => d.studyTime === range).length,
  }));

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📊 설문 통계</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 원형 차트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">아침형 vs 저녁형</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* 막대 그래프 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">하루 평균 공부 시간</h2>
          <BarChart width={400} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </main>
  );
}