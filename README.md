# softcream-review-practice
ソフトクリームの評価投稿サイト
ChatGPT Plus





今日 11:41
Githubの新しい練習問題を作成して

APP目的：ソフトクリームの評価サイトを以下を使って構築

GitHub Codespaces, 
SupabaseCLI, 
supabese, 
vercelCLI

1. ユーザーニックネーム登録
2. ソフトクリームの評価記入
１）店名
２）ソフトの種類
３）値段
４）食べた日
５）評価軸　5段階で
　（１）ミルク感・濃厚さ乳脂肪分のリッチさや、コクの強さを測る項目。
　（２）なめらかさ・食感シャリシャリ感（水分多め）か、ねっとり滑らかかを表す項目。
　（３）甘さのバランス甘すぎて飽きないか、素材を引き立てるすっきりした甘さか。
　（４）コスパ・ボリューム価格に対する量や、トッピングを含めた満足度。
　（５）珍しさ
　（６）総合満足度見た目の美しさ、お店の雰囲気、リピートしたいかどうかの総評。
3、結果確認→投稿
４，ダッシュボード　：上記6項目をレーダチャートで表示
　（１）総合評価：総得点が高い順に店を並べる
　（２）各項目基準別表示

デプロイはREADMEに従う
これ用のREADME作成して

2m 25s考えました
ソフトクリーム評価サイト用の練習問題READMEを作成しました。

README-softcream-review-practice.md

以下を含んでいます。

ニックネーム登録

6項目の5段階評価

入力確認・投稿

Supabaseのテーブル設計とSQL

レーダーチャート

総合・項目別ランキング

Codespacesでの開発手順

Supabase CLIの設定

Vercel CLIでの公開手順

環境変数の設定

完成チェックリスト

package.jsonエラー、404などの対処方法

発展課題

このファイルをGitHubリポジトリのルートに配置する場合は、ファイル名をREADME.mdに変更して利用してください。


今日 14:58
The directory softcream-review-practice contains files that could conflict:

  README.md
続けて、リポジトリ直下にNext.jsを作成します。 エラーが出ます

原因は、リポジトリ直下にすでにREADME.mdがあり、create-next-appが同名ファイルを作ろうとしているためです。

既存READMEを一時的に名前変更してから進めましょう。

1. 現在地を確認
pwd
ls
softcream-review-practiceの中にいて、README.mdが表示されれば正しいです。

2. READMEの名前を変更
mv README.md README-practice.md
確認します。

ls
README-practice.mdが表示されれば成功です。

3. Next.jsを作成
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
途中で質問が表示された場合は、次のように選択してください。

Would you like to use React Compiler? → No
そのほかは基本的に初期選択のままEnterで構いません。

4. 作成結果を確認
ls
次のようなファイルが表示されれば成功です。

README.md
README-practice.md
package.json
next.config.ts
src
public
5. 開発サーバーを起動
npm run dev
その後、Codespaces画面下部の「PORTS」タブを開き、ポート3000の地球マークを押してください。

なお、Next.jsが新しく作ったREADME.mdと、練習手順のREADME-practice.mdは両方残して問題ありません。今後はREADME-practice.mdを見ながら作業してください。


ライブラリ
/
README-softcream-review-practice.md


練習問題：ソフトクリーム評価サイトを作ろう
GitHub Codespaces、Supabase CLI、Supabase、Vercel CLIを使い、ソフトクリームの評価を投稿・閲覧できるWebアプリを作成します。

1. この練習の目的
この練習では、次の一連の開発作業を経験します。

GitHubリポジトリとCodespacesを使った開発

Next.jsによる画面作成

Supabaseによるデータベース構築

Supabase CLIによるマイグレーション管理

入力フォーム、確認画面、投稿処理の実装

レーダーチャートとランキングの表示

GitHubへの保存

Vercel CLIによる本番公開

2. 完成するアプリ
仮のアプリ名：Soft Cream Review

利用者はニックネームを登録し、食べたソフトクリームを6項目で評価します。投稿後は、店ごとのレーダーチャート、総合ランキング、評価項目別ランキングを確認できます。

3. 使用技術
GitHub

GitHub Codespaces

Next.js（App Router）

TypeScript

Supabase

Supabase CLI

Vercel

Vercel CLI

Recharts（レーダーチャート）

この練習では、メールアドレスとパスワードによるログインは実装せず、ブラウザごとにニックネームを登録する簡易方式とします。本格運用時はSupabase Authを追加してください。

4. 必須機能
4.1 ニックネーム登録
ニックネームを入力できる

空欄では登録できない

登録後は投稿画面へ進む

登録したニックネームをブラウザのlocalStorageに保存する

4.2 ソフトクリーム評価
次の項目を入力できるようにします。

項目	入力形式	必須
店名	テキスト	必須
ソフトの種類	テキスト	必須
値段	0以上の整数（円）	必須
食べた日	日付	必須
ミルク感・濃厚さ	1～5	必須
なめらかさ・食感	1～5	必須
甘さのバランス	1～5	必須
コスパ・ボリューム	1～5	必須
珍しさ	1～5	必須
総合満足度	1～5	必須
評価軸の意味は次のとおりです。

ミルク感・濃厚さ：乳脂肪分のリッチさやコクの強さ

なめらかさ・食感：シャリシャリ感か、ねっとり滑らかか

甘さのバランス：甘すぎず、素材を引き立てる甘さか

コスパ・ボリューム：価格に対する量やトッピングを含めた満足度

珍しさ：味、素材、見た目などに独自性があるか

総合満足度：見た目、お店の雰囲気、再訪意向を含めた総評

4.3 確認・投稿
入力後、すぐ保存せず確認画面を表示する

確認画面に全入力内容を表示する

「修正する」で入力画面へ戻れる

「投稿する」でSupabaseへ保存する

二重投稿を防ぐため、保存中は投稿ボタンを無効にする

投稿成功後は完了メッセージを表示する

4.4 ダッシュボード
6項目をレーダーチャートで表示する

店ごとに複数投稿がある場合は、各項目の平均値を表示する

総合ランキングを表示する

6つの評価項目それぞれで並べ替えられる

同点の場合も正しく表示する

投稿が0件の場合は案内メッセージを表示する

総合ランキングの点数は、6項目の平均値を使います。

総合評価点 =
（ミルク感 + なめらかさ + 甘さ + コスパ + 珍しさ + 総合満足度）÷ 6
店名が同じ投稿は同じ店として集計します。この練習では表記が完全に一致する場合のみ同じ店とみなします。

5. 画面構成
URL	画面
/	トップページ
/register	ニックネーム登録
/review/new	評価入力
/review/confirm	入力内容確認
/review/complete	投稿完了
/dashboard	レーダーチャート・ランキング
画面上部には「評価を投稿」「ダッシュボード」のナビゲーションを表示してください。

6. データベース設計
今回はprofilesとreviewsの2テーブルを作成します。

profiles
カラム	型	内容
id	uuid	主キー
nickname	text	ニックネーム
created_at	timestamptz	登録日時
reviews
カラム	型	内容
id	uuid	主キー
profile_id	uuid	投稿者
shop_name	text	店名
softcream_type	text	ソフトの種類
price	integer	値段
eaten_on	date	食べた日
milk_richness	smallint	ミルク感・濃厚さ
smoothness	smallint	なめらかさ・食感
sweetness_balance	smallint	甘さのバランス
value_volume	smallint	コスパ・ボリューム
uniqueness	smallint	珍しさ
overall_satisfaction	smallint	総合満足度
created_at	timestamptz	投稿日時
7. 開発手順
STEP 1：GitHubでリポジトリを作る
GitHubで新しいリポジトリを作成します。

Repository name：softcream-review-practice

PublicまたはPrivate：どちらでも可

Add a README file：チェックを入れる

作成後、リポジトリのCode → Codespaces → Create codespace on mainを選びます。

STEP 2：Next.jsプロジェクトを作る
Codespacesのターミナルで、現在地を確認します。

pwd
ls
続けて、リポジトリ直下にNext.jsを作成します。

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
package.jsonがすでに存在するなどの理由で作成できない場合は、既存READMEを一時的に別名にしてから実行します。重要なファイルを削除しないでください。

作成後、必ず次を確認します。

ls
一覧にpackage.jsonがあれば正しい場所です。次に開発サーバーを起動します。

npm run dev
CodespacesのPORTSタブでポート3000の地球マークを押し、Next.jsの初期画面が表示されることを確認します。確認後、ターミナルでCtrl + Cを押して停止します。

STEP 3：必要なライブラリを追加する
npm install @supabase/supabase-js recharts
npm install --save-dev supabase
バージョンを確認します。

npx supabase --version
npx vercel --version
Vercel CLIが見つからない場合は、次で追加します。

npm install --save-dev vercel
STEP 4：Supabaseプロジェクトを作る
Supabaseのダッシュボードを開く

New projectを押す

プロジェクト名をsoftcream-review-practiceにする

Database Passwordを設定し、安全な場所に保管する

Regionは利用者に近い地域を選択する

プロジェクト作成完了を待つ

プロジェクト画面のURLに含まれるProject Refを確認します。

https://supabase.com/dashboard/project/ここがPROJECT_REF
STEP 5：Supabase CLIを初期化・接続する
Codespacesのターミナルで実行します。

npx supabase login
npx supabase init
npx supabase link --project-ref あなたのPROJECT_REF
ログイン時にURLが表示されたら、ブラウザで開いて認証します。トークンはGitHubやREADMEへ貼り付けないでください。

マイグレーションファイルを作ります。

npx supabase migration new create_softcream_tables
作成されたsupabase/migrations/日時_create_softcream_tables.sqlに次のSQLを記述します。

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(trim(nickname)) between 1 and 30),
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  shop_name text not null check (char_length(trim(shop_name)) between 1 and 100),
  softcream_type text not null check (char_length(trim(softcream_type)) between 1 and 100),
  price integer not null check (price >= 0),
  eaten_on date not null check (eaten_on <= current_date),
  milk_richness smallint not null check (milk_richness between 1 and 5),
  smoothness smallint not null check (smoothness between 1 and 5),
  sweetness_balance smallint not null check (sweetness_balance between 1 and 5),
  value_volume smallint not null check (value_volume between 1 and 5),
  uniqueness smallint not null check (uniqueness between 1 and 5),
  overall_satisfaction smallint not null check (overall_satisfaction between 1 and 5),
  created_at timestamptz not null default now()
);

create index reviews_shop_name_idx on public.reviews (shop_name);
create index reviews_created_at_idx on public.reviews (created_at desc);

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;

create policy "Anyone can read profiles"
on public.profiles for select
using (true);

create policy "Anyone can create profiles"
on public.profiles for insert
with check (true);

create policy "Anyone can read reviews"
on public.reviews for select
using (true);

create policy "Anyone can create reviews"
on public.reviews for insert
with check (
  milk_richness between 1 and 5
  and smoothness between 1 and 5
  and sweetness_balance between 1 and 5
  and value_volume between 1 and 5
  and uniqueness between 1 and 5
  and overall_satisfaction between 1 and 5
);
Supabaseへ反映します。

npx supabase db push
SupabaseダッシュボードのTable Editorでprofilesとreviewsが作成されたことを確認します。

このRLS設定は学習用です。誰でも投稿できるため、公開サービスではSupabase Auth、投稿者本人だけが編集・削除できるポリシー、スパム対策などが必要です。

STEP 6：環境変数を設定する
SupabaseダッシュボードのProject Settings → APIで、Project URLとPublishable keyを確認します。

プロジェクト直下に.env.localを作成します。

NEXT_PUBLIC_SUPABASE_URL=あなたのSupabase Project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=あなたのSupabase Publishable key
.gitignoreに次が含まれていることを確認します。

.env*
NEXT_PUBLIC_で始まる値はブラウザから見える公開用の値です。service_roleキー、Database Password、アクセストークンは絶対に設定しないでください。

src/lib/supabase.tsを作成します。

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabaseの環境変数が設定されていません。");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
STEP 7：画面と機能を実装する
推奨構成は次のとおりです。

src/
├─ app/
│  ├─ page.tsx
│  ├─ register/page.tsx
│  ├─ review/
│  │  ├─ new/page.tsx
│  │  ├─ confirm/page.tsx
│  │  └─ complete/page.tsx
│  └─ dashboard/page.tsx
├─ components/
│  ├─ Header.tsx
│  ├─ RatingInput.tsx
│  ├─ ReviewForm.tsx
│  ├─ ReviewRadarChart.tsx
│  └─ RankingTable.tsx
├─ lib/
│  └─ supabase.ts
└─ types/
   └─ review.ts
実装順は次を推奨します。

ニックネーム登録とprofilesへの保存

登録したprofile_idとニックネームのlocalStorage保存

評価入力フォーム

入力値をsessionStorageに一時保存

確認画面

reviewsへの投稿

店別平均値の集計

RechartsのRadarChartによる表示

総合・項目別ランキング

レスポンシブ対応

localStorageやsessionStorageを使用するコンポーネントには、ファイル先頭に次を記述します。

"use client";
STEP 8：ローカル確認を行う
npm run dev
次のテストを行います。

ニックネーム未入力時にエラーになる

6項目すべてで1～5を選択できる

未来の日付を登録できない

値段にマイナス値を登録できない

確認画面に入力内容が正しく表示される

修正ボタンで入力内容を維持したまま戻れる

投稿後、Supabaseのreviewsに1件追加される

同じ店に2件投稿すると平均値が正しくなる

レーダーチャートに6軸が表示される

総合評価の高い順に並ぶ

各項目で並べ替えられる

スマートフォン幅でも画面が崩れない

ビルドエラーがないことも確認します。

npm run lint
npm run build
8. GitHubへ保存する
機密情報が含まれていないことを確認します。

git status
git add .
git commit -m "Build soft cream review app"
git push origin main
GitHub上で.env.localが表示されていないことを必ず確認してください。

9. Vercel CLIでデプロイする
9.1 Vercelへログイン
npx vercel login
表示された案内に従い、ブラウザで認証します。

9.2 最初のデプロイ
npx vercel
質問には基本的に次のように回答します。

質問	回答例
Set up and deploy?	Y
Which scope?	自分のアカウント
Link to existing project?	初回はN
Project name?	softcream-review-practice
In which directory is your code located?	./
Want to modify settings?	N
9.3 Vercelに環境変数を登録する
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
値の入力を求められたら、それぞれSupabaseの値を入力します。必要に応じてpreviewとdevelopmentにも同じ環境変数を追加します。

登録内容は次で確認できます。

npx vercel env ls
値を入力する際にStore as sensitive?と聞かれた場合、今回の2つは公開用の値なのでNoでも構いません。ただし、秘密鍵やservice_roleキーは登録・使用しないでください。

9.4 本番デプロイ
npx vercel --prod
最後に表示された本番URLを開き、ニックネーム登録、投稿、ダッシュボード表示まで確認します。

10. 完成条件
次をすべて満たしたら完成です。

GitHubリポジトリからCodespacesを起動できる

package.jsonがリポジトリ直下にある

Supabase CLIでマイグレーションを反映できる

ニックネームを登録できる

ソフトクリームの情報を入力できる

6項目を1～5で評価できる

確認画面から修正または投稿できる

投稿データがSupabaseに保存される

店別の6項目平均をレーダーチャートで表示できる

総合評価順に店を表示できる

各評価項目で並べ替えできる

npm run buildが成功する

GitHubへコードをpushできる

Vercelの本番URLでアプリを利用できる

11. よくあるエラー
npm error enoent Could not read package.json
npm run devを実行した場所が違います。

pwd
ls
lsの結果にpackage.jsonがあるディレクトリへ移動してから実行します。

cd リポジトリ名
npm run dev
404が表示される
src/app/page.tsxが存在するか確認する

ファイル名がpage.tsxになっているか確認する

開いているURLがポート3000のURLか確認する

開発サーバーを再起動する

npm run dev
Supabaseで投稿できない
.env.localの変数名と値を確認する

.env.local変更後にnpm run devを再起動する

テーブル名とカラム名を確認する

RLSポリシーが作成されているか確認する

ブラウザの開発者ツールでエラー内容を確認する

Vercelでだけエラーになる
npx vercel env lsで本番用環境変数を確認する

環境変数追加後に再デプロイする

npx vercel --prod
npm run buildをCodespaces内で実行し、同じエラーが出るか確認する

SupabaseのログインURLが表示されたまま進まない
表示されたURLをブラウザで開いて認証を完了します。別のターミナルにコマンドを貼り付けないでください。

12. 発展課題
基本機能が完成したら、次に挑戦してください。

Supabase Authによるログイン

自分の投稿だけを編集・削除する機能

店名、地域、ソフトの種類による検索

写真アップロード

地図表示

コメント機能

お気に入り機能

投稿数を考慮したランキング

店名の表記揺れ対策

価格帯別ランキング

13. 注意事項
Database Password、アクセストークン、service_roleキーはGitHubへ保存しない

.env.localをGitへ追加しない

本番公開前にRLSが有効であることを確認する

実在店舗の誹謗中傷や個人情報を投稿しない

写真機能を追加する場合は、著作権や肖像権に注意する

この練習のゴールは、画面を作るだけではなく、入力 → 確認 → データ保存 → 集計 → 可視化 → 公開までを一通り完成させることです。

