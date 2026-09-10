"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type ShopScore = {
  shopName: string;
  reviewCount: number;
  imageUrl: string | null;
  averagePrice: number;
  milkRichness: number;
  smoothness: number;
  sweetnessBalance: number;
  valueVolume: number;
  uniqueness: number;
  overallSatisfaction: number;
  totalAverage: number;
};

type ReviewRadarChartProps = {
  shop: ShopScore;
};

export default function ReviewRadarChart({
  shop,
}: ReviewRadarChartProps) {
  const chartData = [
    {
      subject: "ミルク感",
      score: shop.milkRichness,
    },
    {
      subject: "なめらかさ",
      score: shop.smoothness,
    },
    {
      subject: "甘さ",
      score: shop.sweetnessBalance,
    },
    {
      subject: "コスパ",
      score: shop.valueVolume,
    },
    {
      subject: "珍しさ",
      score: shop.uniqueness,
    },
    {
      subject: "総合満足度",
      score: shop.overallSatisfaction,
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        {shop.imageUrl ? (
          <img
            src={shop.imageUrl}
            alt={`${shop.shopName}のソフトクリーム`}
            className="mx-auto mb-4 h-64 w-full max-w-md rounded-2xl object-cover shadow-sm"
          />
        ) : (
          <div className="mx-auto mb-4 flex h-48 w-full max-w-md items-center justify-center rounded-2xl bg-orange-50 text-6xl">
            🍦
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-800">
          {shop.shopName}
        </h2>

        <p className="mt-2 font-bold text-orange-600">
          平均価格{" "}
          {Math.round(
            shop.averagePrice
          ).toLocaleString()}
          円
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {shop.reviewCount}件の評価・総合平均{" "}
          {shop.totalAverage.toFixed(2)}点
        </p>
      </div>

      <div className="h-[380px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RadarChart
            data={chartData}
            outerRadius="70%"
          >
            <PolarGrid />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#374151",
                fontSize: 12,
              }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tickCount={6}
            />

            <Radar
              name="平均評価"
              dataKey="score"
              stroke="#f97316"
              fill="#fb923c"
              fillOpacity={0.55}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(2)}点`,
                "平均評価",
              ]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}