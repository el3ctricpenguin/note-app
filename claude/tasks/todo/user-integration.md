# User統合タスク

## 概要
TODOとFilm系のレコード（WatchedFilm、Watchlist）にUser認証を統合し、各ユーザーが自分のデータのみ閲覧・編集できるようにする。

## タスク一覧

### 1. データベース設計
- [x] Prisma schemaでUser、Todo、WatchedFilm、Watchlistの関連付け設計
- [x] 既存テーブルにuserId外部キー追加

### 2. データベースマイグレーション
- [x] TODOテーブルにuserId追加
- [x] WatchedFilmテーブルにuserId追加  
- [x] WatchlistテーブルにuserId追加
- [x] 既存データにデフォルトユーザーID割り当て

### 3. API層の更新
- [x] TODO API でセッション認証とユーザーフィルタリング実装
- [x] Film系API（watched/watchlist）でセッション認証とユーザーフィルタリング実装
- [x] 不正アクセス防止のためのユーザー権限チェック追加

### 4. フロントエンド対応
- [x] 未ログイン時のリダイレクト処理（middleware.tsで実装済み）
- [x] セッションエラー時のエラーハンドリング（fetchWithAuth + 401リダイレクト）
- [x] ユーザー固有データの表示対応（API層でのフィルタリング完了）

## 技術要件
- 現在の認証システム（iron-session）を活用
- 既存データの互換性維持
- セキュリティ考慮（XSS、CSRF対策）

## 完了条件
- 各ユーザーが自分のTODO、映画データのみアクセス可能
- 未ログインユーザーは適切にサインイン画面にリダイレクト
- 既存機能の動作に影響なし