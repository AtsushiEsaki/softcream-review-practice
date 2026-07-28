import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mb-4 text-6xl">🍦</div>

        <h1 className="text-3xl font-bold text-orange-600 sm:text-5xl">
          Soft Cream Review
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
          食べたソフトクリームを6つの評価軸で記録し、
          お気に入りのお店を見つけましょう。
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
          >
            ニックネームを登録
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-orange-500 px-6 py-3 font-bold text-orange-600 hover:bg-orange-50"
          >
            評価を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
