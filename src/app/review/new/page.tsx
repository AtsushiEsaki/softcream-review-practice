import ReviewForm from "@/components/ReviewForm";

export default function NewReviewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600">
          ソフトクリームを評価
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          食べたソフトクリームの情報と、
          6項目の評価を入力してください。
        </p>

        <div className="mt-8">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}