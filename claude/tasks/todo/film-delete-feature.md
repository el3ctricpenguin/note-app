# 映画削除機能実装

## 概要

WatchedとWatchlistの映画に削除機能を追加。FilmModal内に削除ボタンを配置し、削除確認Modalで確認後に削除を実行する。

## タスク一覧

### Phase 1: API実装

- [ ] DELETE /api/film/watched/[watchedFilmId] API実装

    - [ ] 既存route.tsファイル確認
    - [ ] DELETE メソッド追加
    - [ ] ユーザー認証チェック
    - [ ] 対象レコード存在確認・削除処理
    - [ ] エラーハンドリング・レスポンス形式統一

- [ ] DELETE /api/film/watchlist/[watchlistId] API実装
    - [ ] 既存route.tsファイル確認
    - [ ] DELETE メソッド追加
    - [ ] ユーザー認証チェック
    - [ ] 対象レコード存在確認・削除処理
    - [ ] エラーハンドリング・レスポンス形式統一

### Phase 2: UI実装

- [ ] 削除確認Modal作成

    - [ ] DeleteConfirmModal.tsx作成
    - [ ] 一般的な確認メッセージ表示
    - [ ] 削除/キャンセルボタン実装
    - [ ] onConfirm/onCancelコールバック
    - [ ] TypeScript型定義

- [ ] FilmModalに削除ボタン追加
    - [ ] ゴミ箱IconButton追加
    - [ ] type(watched/watchlist)による分岐
    - [ ] 削除確認Modal統合
    - [ ] レイアウト調整

### Phase 3: フック機能拡張

- [ ] useWatchedFilms/useWatchlistFilmsに削除機能追加
    - [ ] deleteWatchedFilm/deleteWatchlistFilm関数追加
    - [ ] API呼び出し実装
    - [ ] 削除成功/失敗時のトースト表示
    - [ ] 削除後のリスト再取得
    - [ ] エラーハンドリング

### Phase 4: 統合・検証

- [ ] 削除機能の動作確認
- [ ] エラーケースの確認
- [ ] TypeScript型エラーの修正
- [ ] ビルド・リント確認

## 対象ファイル

- `/src/app/api/film/watched/[watchedFilmId]/route.ts`
- `/src/app/api/film/watchlist/[watchlistId]/route.ts`
- `/src/components/modals/DeleteConfirmModal.tsx` (新規)
- `/src/components/modals/FilmModal.tsx`
- `/src/hooks/useWatchedFilms.ts`
- `/src/hooks/useWatchlistFilms.ts`
