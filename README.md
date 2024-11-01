# weather-app

## プロダクト概要

- 地名または緯度経度の情報から、週間の天気予報を確認できる
- 日付ごとに詳細な気象情報を確認できる

## セットアップ

### リポジトリのクローン

```bash
git clone git@github.com:y-suzuki05/weather-app.git
```

### ディレクトリの移動

```bash
cd weather-app
```

### npmインストール

```
npm install
```

### 環境変数

.env.localファイルを作成し、環境変数を設定してください。
内容はお渡しするのでご連絡ください。

### local環境の起動

```bash
npm run dev
```

### 画面確認

http://localhost:3000/

## コマンドリファレンス

```bash
# Lint実行
npm run lint
npm run lint:fix
# コード整形
npm run format
# テスト実行
npm run test
```

## 課題に関して

### デプロイしたURL

https://weather-app-plum-psi-68.vercel.app/

### 課題の取り組み開始から完了までに要した合計時間

- 18時間（10/26~11/1）
- 要件は満たせていると思いますが、例えば以下について改善していきたいです
  - コンポーネント内にロジックを書いているため、hooksや関数に切り出す
  - Github ActionsでLint, Prettier, テストを実行するワークフローの設定
  - MSWを使用して、API実行後のUIのテストを追加
  - 命名やコンポーネントの粒度など全体的なリファクタリング
  - 緯度経度はスペースを空けて入力する必要がありますが、わかりにくいと感じたため注意文の追加などの改善

### 初めて使用する技術と代わりとなる経験

- styled-components
  - 現職ではChakra UIを使用しています
- Next.jsのAPI Routes
  - 代わりとなる経験なし
  - バックエンドの勉強としてExpressでAPIエンドポイントの定義をしたことはあります

### 追加したnpmパッケージとその理由や役割

- styled-components
  - スタイリングに使用するため

### LLMに関して

LLMの使用はありません
