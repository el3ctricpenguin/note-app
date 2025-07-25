# プロジェクト概要

## アプリケーション
映画管理・TODO管理アプリ

## 技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL + Prisma ORM
- **UI**: Chakra UI
- **認証**: カスタム実装 (JWT + cookies)
- **スタイリング**: Emotion (Chakra UI内包)

## 主要機能
1. **認証システム**: ユーザー登録・ログイン・ログアウト
2. **映画管理**: 
   - 視聴済み映画記録 (評価・メモ付き)
   - ウォッチリスト管理
   - 日付別表示
3. **TODO管理**: 基本的なタスク管理

## アーキテクチャ
- **API Routes**: `/src/app/api/` (REST API)
- **Pages**: `/src/app/` (React Server Components)
- **Components**: `/src/components/` (再利用可能コンポーネント)
- **Database**: Prisma schema定義済み

## 現在の状況
- **総行数**: 2,289行 (47ファイル)
- **削減目標**: 30-40%削減 → 1,375-1,602行
- **作業ブランチ**: `refactor/code-reduction`