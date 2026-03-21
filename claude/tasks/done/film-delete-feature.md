# 映画削除機能実装

## 概要

WatchedとWatchlistの映画に削除機能を追加。FilmModal内に削除ボタンを配置し、削除確認Modalで確認後に削除を実行する。

## タスク一覧

### Phase 1: API実装

- [x] DELETE /api/film/watched/[watchedFilmId] API実装

    - [x] 既存route.tsファイル確認
    - [x] DELETE メソッド追加
    - [x] ユーザー認証チェック
    - [x] 対象レコード存在確認・削除処理
    - [x] エラーハンドリング・レスポンス形式統一

- [x] DELETE /api/film/watchlist/[watchlistId] API実装
    - [x] 既存route.tsファイル確認
    - [x] DELETE メソッド追加
    - [x] ユーザー認証チェック
    - [x] 対象レコード存在確認・削除処理
    - [x] エラーハンドリング・レスポンス形式統一

### Phase 2: UI実装

- [x] 削除確認Modal作成

    - [x] DeleteConfirmModal.tsx作成
    - [x] 一般的な確認メッセージ表示
    - [x] 削除/キャンセルボタン実装
    - [x] onConfirm/onCancelコールバック
    - [x] TypeScript型定義

- [x] FilmModalに削除ボタン追加
    - [x] ゴミ箱IconButton追加
    - [x] type(watched/watchlist)による分岐
    - [x] 削除確認Modal統合
    - [x] レイアウト調整

### Phase 3: フック機能拡張

- [x] useWatchedFilms/useWatchlistFilmsに削除機能追加
    - [x] deleteWatchedFilm/deleteWatchlistFilm関数追加
    - [x] API呼び出し実装
    - [x] 削除成功/失敗時のトースト表示
    - [x] 削除後のリスト再取得
    - [x] エラーハンドリング

### Phase 4: 統合・検証

- [x] 削除機能の動作確認
- [x] エラーケースの確認
- [x] TypeScript型エラーの修正
- [x] ビルド・リント確認

## 対象ファイル

- `/src/app/api/film/watched/[watchedFilmId]/route.ts`
- `/src/app/api/film/watchlist/[watchlistId]/route.ts`
- `/src/components/modals/DeleteConfirmModal.tsx` (新規)
- `/src/components/modals/FilmModal.tsx`
- `/src/hooks/useWatchedFilms.ts`
- `/src/hooks/useWatchlistFilms.ts`
