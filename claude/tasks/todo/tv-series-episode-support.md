# ドラマエピソード対応機能実装

## 概要

TMDBのTV Series APIを活用して、ドラマのエピソード単位での視聴記録を可能にする。シーズン・エピソード単位で「いつ見たか」を記録し、映画と同様の管理機能を提供する。

## 調査結果

### TMDB TV Series API機能
- TV Series Details: `/tv/{series_id}` でシリーズ情報取得
- Season Details: `/tv/{series_id}/season/{season_number}` でシーズン・エピソード一覧取得  
- Episode Details: `/tv/{series_id}/season/{season_number}/episode/{episode_number}` で個別エピソード情報取得
- Search TV: `/search/tv` でTV番組検索

## タスク一覧

### Phase 1: データベース設計・拡張

- [ ] TV Series用テーブル設計
    - [ ] TVSeries テーブル作成（シリーズ情報）
    - [ ] TVSeason テーブル作成（シーズン情報）
    - [ ] TVEpisode テーブル作成（エピソード情報）
    - [ ] WatchedEpisode テーブル作成（視聴記録）
    - [ ] Prisma migration作成・実行

### Phase 2: TMDB API拡張

- [ ] TV Series API実装
    - [ ] TV番組検索API実装 (`/search/tv`)
    - [ ] TV Series詳細取得関数追加
    - [ ] Season詳細取得関数追加  
    - [ ] Episode詳細取得関数追加
    - [ ] 型定義追加（TMDBTVData, TMDBSeasonData, TMDBEpisodeData）

### Phase 3: Backend API実装

- [ ] TV Series管理API作成
    - [ ] POST `/api/tv/series` - シリーズ情報取得・保存
    - [ ] GET `/api/tv/series/[id]/seasons` - シーズン一覧取得
    - [ ] GET `/api/tv/series/[id]/seasons/[season]/episodes` - エピソード一覧取得
    
- [ ] Episode視聴記録API作成
    - [ ] POST `/api/tv/watched-episodes` - エピソード視聴記録
    - [ ] GET `/api/tv/watched-episodes/by-date` - 日付別視聴記録取得
    - [ ] DELETE `/api/tv/watched-episodes/[id]` - 視聴記録削除

### Phase 4: UI・UX実装

- [ ] TV Series検索・選択UI
    - [ ] TV番組検索機能追加（useFilmSearchにTV対応）
    - [ ] TV/Movie切り替えタブ
    - [ ] シリーズ詳細表示コンポーネント
    
- [ ] Episode選択・管理UI
    - [ ] シーズン・エピソード選択コンポーネント
    - [ ] エピソード一覧表示（シーズン単位）
    - [ ] 視聴済みマーク表示機能

- [ ] Episode記録フォーム
    - [ ] エピソード視聴記録フォーム
    - [ ] 視聴日・評価・メモ入力
    - [ ] バッチ記録機能（複数エピソード一括）

### Phase 5: 表示・管理機能

- [ ] TV番組専用ページ作成
    - [ ] `/tv` ページ作成
    - [ ] エピソード視聴記録表示（年・月・日グループ）
    - [ ] シリーズ別表示機能
    - [ ] 進捗表示（Season進捗、Series進捗）

- [ ] フック・ユーティリティ
    - [ ] useWatchedEpisodes フック作成
    - [ ] useTVSeriesSearch フック作成
    - [ ] エピソード視聴進捗計算関数
    - [ ] 視聴統計表示機能

### Phase 6: 統合・最適化

- [ ] メイン画面統合
    - [ ] トップページにTV番組セクション追加
    - [ ] 映画・TV番組統合ダッシュボード
    - [ ] 最近見たコンテンツ表示（映画・TV混合）

- [ ] 機能統合・最適化
    - [ ] 検索機能の映画・TV統合
    - [ ] Modal・Form共通化対応
    - [ ] 削除機能統合
    - [ ] データ移行・互換性確保

## 技術的考慮事項

- **データ正規化**: TMDBの TV Series ID、Season Number、Episode Number の組み合わせで一意識別
- **API効率化**: シーズン・エピソード情報のキャッシュ戦略
- **UI複雑性**: 映画とTVの選択・管理UIの統合設計
- **データ量**: エピソード単位の記録による大容量化への対応

## 対象ファイル

### 新規作成
- `prisma/migrations/add-tv-series.sql`
- `/src/app/api/tv/**/*` (API Routes)
- `/src/app/tv/**/*` (TV Pages)
- `/src/components/tv/**/*` (TV Components)
- `/src/hooks/useTVSeries.ts`, `/src/hooks/useWatchedEpisodes.ts`
- `/src/types/tv.ts` (TV型定義)

### 修正対象  
- `/src/hooks/useFilmSearch.ts` (TV検索対応)
- `/src/components/form/FilmRegistrationForm.tsx` (TV対応)
- `/src/types/index.ts` (TV型追加)
- `prisma/schema.prisma` (TV Schema追加)