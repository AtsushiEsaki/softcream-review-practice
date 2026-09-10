"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import RankingTable from "@/components/RankingTable";
import ReviewRadarChart, {
  ShopScore,
} from "@/components/ReviewRadarChart";
import { supabase } from "@/lib/supabase";
import { Review } from "@/types/review";

type ShopTotal = {
  shopName: string;
  reviewCount: number;
  priceTotal: number;
  imageUrl: string | null;
  milkRichness: number;
  smoothness: number;
  sweetnessBalance: number;
  valueVolume: number;
  uniqueness: number;
  overallSatisfaction: number;
};

function roundScore(value: number) {
  return Math.round(value * 100) / 100;
}

function aggregateReviews(
  reviews: Review[]
): ShopScore[] {
  const shopMap = new Map<string, ShopTotal>();

  reviews.forEach((review) => {
    const shopName = review.shop_name.trim();
    const current = shopMap.get(shopName);

    if (current) {
      current.reviewCount += 1;
      current.priceTotal += Number(review.price);
      current.milkRichness +=
        review.milk_richness;
      current.smoothness +=
        review.smoothness;
      current.sweetnessBalance +=
        review.sweetness_balance;
      current.valueVolume +=
        review.value_volume;
      current.uniqueness +=
        review.uniqueness;
      current.overallSatisfaction +=
        review.overall_satisfaction;

      if (!current.imageUrl && review.image_url) {
        current.imageUrl = review.image_url;
      }

      return;
    }

    shopMap.set(shopName, {
      shopName,
      reviewCount: 1,
      priceTotal: Number(review.price),
      imageUrl: review.image_url,
      milkRichness: review.milk_richness,
      smoothness: review.smoothness,
      sweetnessBalance:
        review.sweetness_balance,
      valueVolume: review.value_volume,
      uniqueness: review.uniqueness,
      overallSatisfaction:
        review.overall_satisfaction,
    });
  });

  return Array.from(shopMap.values()).map(
    (shop) => {
      const milkRichness = roundScore(
        shop.milkRichness / shop.reviewCount
      );

      const smoothness = roundScore(
        shop.smoothness / shop.reviewCount
      );

      const sweetnessBalance = roundScore(
        shop.sweetnessBalance /
          shop.reviewCount
      );

      const valueVolume = roundScore(
        shop.valueVolume / shop.reviewCount
      );

      const uniqueness = roundScore(
        shop.uniqueness / shop.reviewCount
      );

      const overallSatisfaction = roundScore(
        shop.overallSatisfaction /
          shop.reviewCount
      );

      const totalAverage = roundScore(
        (milkRichness +
          smoothness +
          sweetnessBalance +
          valueVolume +
          uniqueness +
          overallSatisfaction) /
          6
      );

      const averagePrice = roundScore(
        shop.priceTotal / shop.reviewCount
      );

      return {
        shopName: shop.shopName,
        reviewCount: shop.reviewCount,
        imageUrl: shop.imageUrl,
        averagePrice,
        milkRichness,
        smoothness,
        sweetnessBalance,
        valueVolume,
        uniqueness,
        overallSatisfaction,
        totalAverage,
      };
    }
  );
}

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>(
    []
  );

  const [selectedShopName, setSelectedShopName] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      setError("");

      const { data, error: selectError } =
        await supabase
          .from("reviews")
          .select(
            `
              id,
              profile_id,
              shop_name,
              softcream_type,
              price,
              image_url,
              eaten_on,
              milk_richness,
              smoothness,
              sweetness_balance,
              value_volume,
              uniqueness,
              overall_satisfaction,
              created_at
            `
          )
          .order("created_at", {
            ascending: false,
          });

      if (selectError) {
        console.error(selectError);
        setError(
          "評価データを読み込めませんでした。"
        );
        setIsLoading(false);
        return;
      }

      setReviews((data ?? []) as Review[]);
      setIsLoading(false);
    }

    loadReviews();
  }, []);

  const shops = useMemo(
    () => aggregateReviews(reviews),
    [reviews]
  );

  useEffect(() => {
    if (
      shops.length > 0 &&
      !shops.some(
        (shop) =>
          shop.shopName === selectedShopName
      )
    ) {
      const highestRatedShop = [...shops].sort(
        (first, second) =>
          second.totalAverage -
          first.totalAverage
      )[0];

      setSelectedShopName(
        highestRatedShop.shopName
      );
    }
  }, [shops, selectedShopName]);

  const selectedShop =
    shops.find(
      (shop) =>
        shop.shopName === selectedShopName
    ) ?? null;

  if (isLoading) {
    return (
      <div className="px-4 py-20 text-center text-gray-600">
        評価データを読み込んでいます...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-600">
          評価ダッシュボード
        </h1>

        <p className="mt-3 text-gray-600">
          店舗ごとの平均評価、平均価格、
          写真とランキングを確認できます。
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!error && shops.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">🍦</div>

          <h2 className="mt-4 text-xl font-bold">
            まだ評価がありません
          </h2>

          <p className="mt-2 text-gray-600">
            最初のソフトクリーム評価を
            投稿してください。
          </p>
        </div>
      )}

      {shops.length > 0 && (
        <div className="space-y-8">
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-5">
              <label
                htmlFor="shopSelect"
                className="block text-sm font-bold text-gray-700"
              >
                チャートを表示する店舗
              </label>

              <select
                id="shopSelect"
                value={selectedShopName}
                onChange={(event) =>
                  setSelectedShopName(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 sm:max-w-md"
              >
                {shops.map((shop) => (
                  <option
                    key={shop.shopName}
                    value={shop.shopName}
                  >
                    {shop.shopName}
                  </option>
                ))}
              </select>
            </div>

            {selectedShop && (
              <ReviewRadarChart
                shop={selectedShop}
              />
            )}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <RankingTable
              shops={shops}
              onSelectShop={(shopName) => {
                setSelectedShopName(shopName);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            />
          </section>
        </div>
      )}
    </div>
  );
}