import Link from "next/link";

export default function CompleteReviewPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-6xl">🍦</div>

        <h1 className="mt-5 text-2xl font-bold text-orange-600">
          投稿が完了しました
        </h1>

        <p className="mt-3 text-gray-600">
          ソフトクリームの評価を保存しました。
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/review/new"
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
          >
            続けて投稿する
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-orange-500 px-6 py-3 font-bold text-orange-600"
          >
            ダッシュボードを見る
          </Link>
        </div>
      </div>
    </div>
  );
}