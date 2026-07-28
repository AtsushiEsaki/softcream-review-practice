"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const existingNickname =
      localStorage.getItem("softcream_nickname");

    if (existingNickname) {
      setSavedNickname(existingNickname);
    }
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      setError("ニックネームを入力してください。");
      return;
    }

    if (trimmedNickname.length > 30) {
      setError(
        "ニックネームは30文字以内で入力してください。"
      );
      return;
    }

    setIsSubmitting(true);

    const { data, error: insertError } = await supabase
      .from("profiles")
      .insert({
        nickname: trimmedNickname,
      })
      .select("id, nickname")
      .single();

    if (insertError || !data) {
      console.error(insertError);
      setError(
        "登録できませんでした。Supabaseの設定を確認してください。"
      );
      setIsSubmitting(false);
      return;
    }

    localStorage.setItem(
      "softcream_profile_id",
      data.id
    );

    localStorage.setItem(
      "softcream_nickname",
      data.nickname
    );

    router.push("/review/new");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600">
          ニックネーム登録
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          評価を投稿するときに使用するニックネームを
          登録してください。
        </p>

        {savedNickname && (
          <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            現在のニックネーム：
            <span className="font-bold">
              {savedNickname}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="nickname"
            className="block text-sm font-bold text-gray-700"
          >
            ニックネーム
          </label>

          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(event) =>
              setNickname(event.target.value)
            }
            maxLength={30}
            placeholder="例：ソフトクリーム太郎"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <p className="mt-2 text-right text-xs text-gray-500">
            {nickname.length}/30文字
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600 disabled:bg-gray-400"
          >
            {isSubmitting
              ? "登録しています..."
              : "登録して評価へ進む"}
          </button>
        </form>
      </div>
    </div>
  );
}