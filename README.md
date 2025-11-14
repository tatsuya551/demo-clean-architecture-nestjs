# Demo Clean Architecture (NestJS)

NestJS を用いて Clean Architecture を実践したデモプロジェクトです。  
Controller → UseCase → Repository → Infrastructure の依存方向を明確に分離し、  
拡張性・可読性・テスト容易性を高める構成を採用しています。

InMemory Repository を使用しているため、外部 API を叩かずローカルで結果を取得できます


## 技術スタック

- **Node.js / TypeScript**
- **NestJS**
- **Clean Architecture**
- **Jest（テスト）**
- **ESLint / Prettier**


## プロジェクト構成
```
src
├── app.module.ts                            # アプリ全体のルートモジュール（各モジュールをまとめる）
├── assets                                   # ダミーデータ・型定義・設定ファイルなどを配置
└── v1 # API バージョン（v1）
    └── townPlanning
        └── estateTransaction
            ├── controller                   # プレゼンテーション層
            │   └── dto                      # Controller入出力のDTO定義
            ├── domain                       # ドメイン層（ビジネスルールの本体）
            │   ├── entity
            │   └── valueObject
            ├── infrastructure               # 外部データソース（DB・API・InMemory）の実装
            ├── repository                   # Repository インターフェース
            ├── usecase                      # ユースケース単位のビジネスロジック
            └── estate-transaction.module.ts # DIコンテナによる依存性注入を可能にするための定義
```

### Clean Architecture の依存関係
- Controller → UseCase → Repository Interface → Infrastructure
- Infrastructure は **ドメインに依存しない**
- UseCase はインターフェースを経由してインフラを利用

## ローカル起動方法

プロジェクトルートで npm パッケージをインストール

```bash
npm install
```

開発モードでアプリを起動
```bash
npm run start:dev
```

## API

サンプルエンドポイントは以下の通りです
```bash
GET http://localhost:3000/api/v1/townPlanning/estateTransaction/bar
```

例：curl で叩く場合
```bash
curl "http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=8&type=1"
```