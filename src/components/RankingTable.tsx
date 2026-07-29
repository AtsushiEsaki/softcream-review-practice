"use client";

import { useMemo, useState } from "react";
import { ShopScore } from "@/components/ReviewRadarChart";

type RankingMetric =
  | "totalAverage"
  | "milkRichness"
  | "smoothness"
  | "sweetnessBalance"
  | "valueVolume"
  | "uniqueness"
  | "overallSatisfaction";

type RankingTableProps = {
  shops: ShopScore[];
  onSelectShop: (shopName: string) => void;
};

const metricOptions: Array<{
  value: RankingMetric;
  label: string;
}> = [
  {
    value: "totalAverage",
    label: "総合評価",
  },
  {
    value: "milkRichness",
    label: "ミルク感・濃厚さ",
  },
  {
    value: "smoothness",
    label: "なめらかさ・食感",
  },
  {
    value: "sweetnessBalance",
    label: "甘さのバランス",
  },
  {
    value: "valueVolume",
    label: "コスパ・ボリューム",
  },
  {
    value: "uniqueness",
    label: "珍しさ",
  },
  {
    value: "overallSatisfaction",
    label: "総合満足度",
  },
];

export default function RankingTable({
  shops,
  onSelectShop,
}: RankingTableProps) {
  const [metric, setMetric] =
    useState<RankingMetric>("totalAverage");

  const sortedShops = useMemo(() => {
    return [...shops].sort((first, second) => {
      const scoreDifference =
        second[metric] - first[metric];

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return first.shopName.localeCompare(
        second.shopName,
        "ja"
      );
    });
  }, [shops, metric]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          店舗ランキング
        </h2>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-bold text-gray-600">
            評価基準
          </span>

          <select
            value={metric}
            onChange={(event) =>
              setMetric(
                event.target.value as RankingMetric
              )
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2"
          >
            {metricOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-orange-50 text-left text-sm text-gray-700">
              <th className="border-b px-4 py-3">
                順位
              </th>
              <th className="border-b px-4 py-3">
                店名
              </th>
              <th className="border-b px-4 py-3">
                選択項目
              </th>
              <th className="border-b px-4 py-3">
                総合評価
              </th>
              <th className="border-b px-4 py-3">
                投稿数
              </th>
              <th className="border-b px-4 py-3">
                チャート
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedShops.map((shop, index) => (
              <tr
                key={shop.shopName}
                className="text-sm hover:bg-orange-50"
              >
                <td className="border-b px-4 py-4 font-bold">
                  {index + 1}
                </td>

                <td className="border-b px-4 py-4 font-bold text-gray-800">
                  {shop.shopName}
                </td>

                <td className="border-b px-4 py-4 font-bold text-orange-600">
                  {shop[metric].toFixed(2)}点
                </td>

                <td className="border-b px-4 py-4">
                  {shop.totalAverage.toFixed(2)}点
                </td>

                <td className="border-b px-4 py-4">
                  {shop.reviewCount}件
                </td>

                <td className="border-b px-4 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectShop(shop.shopName)
                    }
                    className="rounded-lg border border-orange-500 px-3 py-2 font-bold text-orange-600 hover:bg-orange-50"
                  >
                    表示
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}