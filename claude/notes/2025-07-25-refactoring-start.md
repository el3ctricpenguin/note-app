# 2025-07-25: リファクタリング開始

## 今日の目標
- [x] Claude構成整備完了
- [ ] 共通ユーティリティ作成 (`src/lib/api-utils.ts`)
- [ ] エラーハンドリング統一
- [ ] 認証API共通化

## 現状
- 総行数: 2,289行
- 削減目標: 30-40% (1,375-1,602行)
- ブランチ: `refactor/code-reduction`

## 作業開始
### 1. 共通ユーティリティ作成
APIで重複しているエラーハンドリングを統一する

### 進捗 (2025-07-26 続き)
- [x] ブランチ準備 (`refactor/code-reduction`)
- [x] `src/lib/api-utils.ts` 作成
- [x] エラーハンドリング関数実装 (`createErrorResponse`, `withErrorHandling`)
- [x] レスポンス形式統一関数実装 (`createSuccessResponse`)
- [x] todo/route.ts で適用テスト完了 (ビルド成功)
- [ ] 他のAPIルートで適用 (film/watched, auth系)

#### 全APIルート適用完了 ✅
- [x] todo/route.ts
- [x] film/watched/route.ts  
- [x] film/watched/[watchedFilmId]/route.ts
- [x] (auth)/sign-up/route.ts (Zodバリデーション対応)
- [x] (auth)/sign-in/route.ts (Zodバリデーション + 401エラー対応)
- [x] (auth)/sign-out/route.ts
- [x] todo/[id]/route.ts
- [x] film/watched/by-date/route.ts
- [x] film/watchlist/route.ts
- [x] film/watchlist/[watchlistId]/route.ts

#### 改善完了
- ✅ `createErrorResponse` にステータスコードオーバーライド機能追加
- ✅ 全10ファイルでapi-utils適用完了
- ✅ `api-utils.ts` → `api.ts` にリネーム
- ✅ 全importパス更新完了
- ✅ ビルドテスト成功