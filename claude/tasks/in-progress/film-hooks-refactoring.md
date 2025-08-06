# 映画ページフック分割リファクタリング

## 概要

`src/app/film/page.tsx` と `src/app/film/watchlist/page.tsx` の重複コードをカスタムフックに分割してリファクタリングする

## タスク一覧

### Phase 1: 共通フックの作成

- [x] `hooks/useFilmSearch.ts` - 映画検索機能の共通化
- [x] `components/form/FilmSearchInput.tsx` - 検索UI共通化
- [x] `components/form/FilmRegistrationForm.tsx` - フォーム統合コンポーネント
- [x] `hooks/useFilmForm.ts` - フォーム送信・エラーハンドリングの共通化
- [x] `hooks/useFilmModal.ts` - モーダル管理の共通化
- [x] `hooks/useFilmData.ts` - TMDB映画データ取得の共通化

### Phase 2: ページ専用フックの作成

- [ ] `hooks/useWatchedFilms.ts` - 視聴済み映画管理
- [ ] `hooks/useWatchlist.ts` - ウォッチリスト管理

### Phase 3: ページコンポーネントのリファクタリング

- [x] `src/app/film/page.tsx` をフック使用版に書き換え
- [x] `src/app/film/watchlist/page.tsx` をフック使用版に書き換え

### Phase 4: 検証・清理

- [ ] 動作確認（映画検索、登録、一覧表示）
- [ ] 型エラーの修正
- [ ] 不要なimportの削除
- [ ] コードレビュー

## 期待される成果

- 重複コード約140行の削減
- ロジックの分離によるテスタビリティ向上
- 再利用可能なフックの作成
- 保守性の向上

## 開始日

2025-08-04
