import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-orange-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-orange-600"
        >
          🍦 Soft Cream Review
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm font-medium">
          <Link
            href="/register"
            className="text-gray-700 hover:text-orange-600"
          >
            ニックネーム登録
          </Link>

          <Link
            href="/review/new"
            className="text-gray-700 hover:text-orange-600"
          >
            評価を投稿
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-orange-600"
          >
            ダッシュボード
          </Link>
        </nav>
      </div>
    </header>
  );
}
