"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ReviewFormData } from "@/types/review";

const ratingRows: Array<{
  key: keyof ReviewFormData;
  label: string;
}> = [
  {
    key: "milkRichness",
    label: "ミルク感・濃厚さ",
  },
  {
    key: "smoothness",
    label: "なめらかさ・食感",
  },
  {
    key: "sweetnessBalance",
    label: "甘さのバランス",
  },
  {
    key: "valueVolume",
    label: "コスパ・ボリューム",
  },
  {
    key: "uniqueness",
    label: "珍しさ",
  },
  {
    key: "overallSatisfaction",
    label: "総合満足度",
  },
];

function getFileExtension(fileType?: string) {
  if (fileType === "image/png") {
    return "png";
  }

  if (fileType === "image/webp") {
    return "webp";
  }

  return "jpg";
}

export default function ConfirmReviewPage() {
  const router = useRouter();

  const [review, setReview] =
    useState<ReviewFormData | null>(null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    const savedReview = sessionStorage.getItem(
      "softcream_review_form"
    );

    if (!savedReview) {
      router.replace("/review/new");
      return;
    }

    try {
      setReview(JSON.parse(savedReview));
    } catch {
      sessionStorage.removeItem(
        "softcream_review_form"
      );
      router.replace("/review/new");
    }
  }, [router]);

  async function uploadImage(
    profileId: string,
    imageDataUrl: string,
    imageType?: string
  ) {
    const response = await fetch(imageDataUrl);
    const imageBlob = await response.blob();

    const extension = getFileExtension(
      imageType || imageBlob.type
    );

    const filePath = `${profileId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } =
      await supabase.storage
        .from("review-images")
        .upload(filePath, imageBlob, {
          cacheControl: "3600",
          contentType:
            imageType || imageBlob.type,
          upsert: false,
        });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("review-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handlePost() {
    if (!review || isSubmitting) {
      return;
    }

    const profileId = localStorage.getItem(
      "softcream_profile_id"
    );

    if (!profileId) {
      router.replace("/register");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      let imageUrl: string | null = null;

      if (review.imageDataUrl) {
        imageUrl = await uploadImage(
          profileId,
          review.imageDataUrl,
          review.imageType
        );
      }

      const { error: insertError } =
        await supabase.from("reviews").insert({
          profile_id: profileId,
          shop_name: review.shopName.trim(),
          softcream_type:
            review.softcreamType.trim(),
          price: Number(review.price),
          image_url: imageUrl,
          eaten_on: review.eatenOn,
          milk_richness: review.milkRichness,
          smoothness: review.smoothness,
          sweetness_balance:
            review.sweetnessBalance,
          value_volume: review.valueVolume,
          uniqueness: review.uniqueness,
          overall_satisfaction:
            review.overallSatisfaction,
        });

      if (insertError) {
        throw insertError;
      }

      sessionStorage.removeItem(
        "softcream_review_form"
      );

      router.push("/review/complete");
    } catch (postError) {
      console.error(postError);
      setError(
        "投稿できませんでした。写真またはSupabaseの設定を確認してください。"
      );
      setIsSubmitting(false);
    }
  }

  if (!review) {
    return (
      <div className="p-10 text-center">
        読み込んでいます...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600">
          入力内容の確認
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          内容を確認して「投稿する」を押してください。
        </p>

        {review.imageDataUrl && (
          <div className="mt-8">
            <p className="mb-2 font-bold text-gray-600">
              写真
            </p>

            <img
              src={review.imageDataUrl}
              alt={`${review.shopName}のソフトクリーム`}
              className="h-72 w-full rounded-xl object-cover"
            />
          </div>
        )}

        <dl className="mt-8 divide-y divide-gray-200">
          <div className="grid gap-1 py-4 sm:grid-cols-2">
            <dt className="font-bold text-gray-600">
              店名
            </dt>
            <dd>{review.shopName}</dd>
          </div>

          <div className="grid gap-1 py-4 sm:grid-cols-2">
            <dt className="font-bold text-gray-600">
              ソフトの種類
            </dt>
            <dd>{review.softcreamType}</dd>
          </div>

          <div className="grid gap-1 py-4 sm:grid-cols-2">
            <dt className="font-bold text-gray-600">
              値段
            </dt>
            <dd>
              {Number(review.price).toLocaleString()}
              円
            </dd>
          </div>

          <div className="grid gap-1 py-4 sm:grid-cols-2">
            <dt className="font-bold text-gray-600">
              食べた日
            </dt>
            <dd>{review.eatenOn}</dd>
          </div>

          {ratingRows.map((row) => (
            <div
              key={row.key}
              className="grid gap-1 py-4 sm:grid-cols-2"
            >
              <dt className="font-bold text-gray-600">
                {row.label}
              </dt>

              <dd className="font-bold text-orange-600">
                {String(review[row.key])}点
              </dd>
            </div>
          ))}
        </dl>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() =>
              router.push("/review/new")
            }
            disabled={isSubmitting}
            className="flex-1 rounded-xl border border-orange-500 px-6 py-3 font-bold text-orange-600 disabled:border-gray-300 disabled:text-gray-400"
          >
            修正する
          </button>

          <button
            type="button"
            onClick={handlePost}
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600 disabled:bg-gray-400"
          >
            {isSubmitting
              ? "投稿しています..."
              : "投稿する"}
          </button>
        </div>
      </div>
    </div>
  );
}