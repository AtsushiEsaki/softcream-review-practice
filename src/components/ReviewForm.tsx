"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RatingInput from "@/components/RatingInput";
import {
  RatingValue,
  ReviewFormData,
} from "@/types/review";

const initialFormData: ReviewFormData = {
  shopName: "",
  softcreamType: "",
  price: "",
  eatenOn: "",
  milkRichness: 3,
  smoothness: 3,
  sweetnessBalance: 3,
  valueVolume: 3,
  uniqueness: 3,
  overallSatisfaction: 3,
};

export default function ReviewForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<ReviewFormData>(initialFormData);

  const [error, setError] = useState("");

  useEffect(() => {
    const profileId = localStorage.getItem(
      "softcream_profile_id"
    );

    if (!profileId) {
      router.replace("/register");
      return;
    }

    const savedReview = sessionStorage.getItem(
      "softcream_review_form"
    );

    if (savedReview) {
      try {
        setFormData(JSON.parse(savedReview));
      } catch {
        sessionStorage.removeItem(
          "softcream_review_form"
        );
      }
    }
  }, [router]);

  function updateTextField(
    field:
      | "shopName"
      | "softcreamType"
      | "price"
      | "eatenOn",
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateRating(
    field:
      | "milkRichness"
      | "smoothness"
      | "sweetnessBalance"
      | "valueVolume"
      | "uniqueness"
      | "overallSatisfaction",
    value: RatingValue
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!formData.shopName.trim()) {
      setError("店名を入力してください。");
      return;
    }

    if (!formData.softcreamType.trim()) {
      setError("ソフトの種類を入力してください。");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("値段を0円以上で入力してください。");
      return;
    }

    if (!formData.eatenOn) {
      setError("食べた日を入力してください。");
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (formData.eatenOn > today) {
      setError("未来の日付は登録できません。");
      return;
    }

    sessionStorage.setItem(
      "softcream_review_form",
      JSON.stringify(formData)
    );

    router.push("/review/confirm");
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="shopName"
          className="block text-sm font-bold text-gray-700"
        >
          店名
        </label>

        <input
          id="shopName"
          type="text"
          value={formData.shopName}
          onChange={(event) =>
            updateTextField(
              "shopName",
              event.target.value
            )
          }
          placeholder="例：ソフトクリーム牧場"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label
          htmlFor="softcreamType"
          className="block text-sm font-bold text-gray-700"
        >
          ソフトの種類
        </label>

        <input
          id="softcreamType"
          type="text"
          value={formData.softcreamType}
          onChange={(event) =>
            updateTextField(
              "softcreamType",
              event.target.value
            )
          }
          placeholder="例：北海道ミルク"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-bold text-gray-700"
        >
          値段（税込・円）
        </label>

        <input
          id="price"
          type="number"
          min="0"
          step="1"
          value={formData.price}
          onChange={(event) =>
            updateTextField("price", event.target.value)
          }
          placeholder="例：450"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label
          htmlFor="eatenOn"
          className="block text-sm font-bold text-gray-700"
        >
          食べた日
        </label>

        <input
          id="eatenOn"
          type="date"
          max={today}
          value={formData.eatenOn}
          onChange={(event) =>
            updateTextField(
              "eatenOn",
              event.target.value
            )
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div className="space-y-4">
        <RatingInput
          label="ミルク感・濃厚さ"
          description="乳脂肪分のリッチさや、コクの強さ"
          value={formData.milkRichness}
          onChange={(value) =>
            updateRating("milkRichness", value)
          }
        />

        <RatingInput
          label="なめらかさ・食感"
          description="シャリシャリ感か、ねっとり滑らかか"
          value={formData.smoothness}
          onChange={(value) =>
            updateRating("smoothness", value)
          }
        />

        <RatingInput
          label="甘さのバランス"
          description="甘すぎず、素材を引き立てる甘さか"
          value={formData.sweetnessBalance}
          onChange={(value) =>
            updateRating("sweetnessBalance", value)
          }
        />

        <RatingInput
          label="コスパ・ボリューム"
          description="価格に対する量やトッピングを含めた満足度"
          value={formData.valueVolume}
          onChange={(value) =>
            updateRating("valueVolume", value)
          }
        />

        <RatingInput
          label="珍しさ"
          description="味、素材、見た目などに独自性があるか"
          value={formData.uniqueness}
          onChange={(value) =>
            updateRating("uniqueness", value)
          }
        />

        <RatingInput
          label="総合満足度"
          description="見た目、お店の雰囲気、また食べたいかを含む総評"
          value={formData.overallSatisfaction}
          onChange={(value) =>
            updateRating(
              "overallSatisfaction",
              value
            )
          }
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
      >
        入力内容を確認する
      </button>
    </form>
  );
}