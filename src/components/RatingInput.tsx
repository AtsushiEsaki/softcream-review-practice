"use client";

import { RatingValue } from "@/types/review";

type RatingInputProps = {
  label: string;
  description: string;
  value: RatingValue;
  onChange: (value: RatingValue) => void;
};

export default function RatingInput({
  label,
  description,
  value,
  onChange,
}: RatingInputProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h3 className="font-bold text-gray-800">{label}</h3>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        {description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((number) => {
          const rating = number as RatingValue;

          return (
            <button
              key={number}
              type="button"
              onClick={() => onChange(rating)}
              className={`h-11 w-11 rounded-full border font-bold ${
                value === rating
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-orange-400"
              }`}
              aria-label={`${label}を${number}点にする`}
            >
              {number}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-sm font-bold text-orange-600">
        現在の評価：{value}点
      </p>
    </div>
  );
}