# PWA (Progressive Web App) 対応実装

## 概要

Next.js アプリケーションをPWA対応し、モバイルデバイスでネイティブアプリのような体験を提供する。オフライン対応、ホーム画面追加機能、プッシュ通知（将来拡張）などを実装。

## 調査結果

### 2024年のNext.js PWA対応状況
- **公式サポート**: 2024年秋にNext.js公式ドキュメントでPWAガイドが公開
- **実装方法**: 外部ライブラリ不要でネイティブNext.js機能のみで実装可能
- **必要条件**: Web Manifest、Service Worker、HTTPS (開発時はlocalhostでOK)

## タスク一覧

### Phase 1: 基本PWA設定

- [ ] Web App Manifest作成
    - [ ] `public/manifest.json` 作成
    - [ ] アプリ名、説明、アイコン設定
    - [ ] テーマカラー、背景色設定
    - [ ] display mode設定 (standalone)
    - [ ] start_url、scope設定

- [ ] アプリアイコン準備
    - [ ] PWA用アイコンセット作成 (192x192, 512x512)
    - [ ] favicon、apple-touch-icon設定
    - [ ] maskable iconも対応
    - [ ] `public/icons/` フォルダ構成

### Phase 2: Service Worker実装

- [ ] Service Worker基本機能
    - [ ] `public/sw.js` 作成
    - [ ] fetch イベントハンドラー実装
    - [ ] install/activate イベント処理
    - [ ] キャッシュ戦略設計

- [ ] キャッシュ戦略実装
    - [ ] Static assets キャッシュ (CSS, JS, images)
    - [ ] API responses キャッシュ (映画データなど)
    - [ ] HTML pages キャッシュ
    - [ ] Cache-first / Network-first 戦略選択

### Phase 3: Next.js統合

- [ ] Next.js設定更新
    - [ ] `next.config.js` PWA設定追加
    - [ ] Service Worker登録コード実装
    - [ ] `app/layout.tsx` にmanifest link追加
    - [ ] meta tags最適化 (viewport, theme-color等)

- [ ] 動的ルート対応
    - [ ] App Router対応確認
    - [ ] 動的ルート (`[id]`) のキャッシュ戦略
    - [ ] API Routes (`/api/*`) のキャッシュ除外
    - [ ] 認証必要ルートの処理

### Phase 4: オフライン対応

- [ ] オフライン機能実装
    - [ ] オフライン検出機能
    - [ ] オフライン時のFallback画面
    - [ ] キャッシュされたデータ表示
    - [ ] オフライン時のフォーム処理 (background sync)

- [ ] オンライン復帰処理
    - [ ] ネットワーク復帰検出
    - [ ] 未同期データの送信
    - [ ] キャッシュ更新処理
    - [ ] ユーザー通知機能

### Phase 5: UX改善

- [ ] インストール促進
    - [ ] Install prompt 表示制御
    - [ ] カスタムインストールボタン
    - [ ] インストール状況検出
    - [ ] ユーザーガイダンス表示

- [ ] PWA特有のUX対応
    - [ ] スプラッシュスクリーン最適化
    - [ ] ナビゲーション改善 (戻るボタン等)
    - [ ] ステータスバー色調整
    - [ ] 全画面表示対応

### Phase 6: パフォーマンス最適化

- [ ] 読み込み最適化
    - [ ] Critical CSS inline化
    - [ ] 画像最適化・lazy loading
    - [ ] コード分割最適化
    - [ ] Preloading戦略

- [ ] PWA監査・テスト
    - [ ] Lighthouse PWA監査
    - [ ] Chrome DevTools PWA テスト
    - [ ] 実機テスト (iOS Safari, Android Chrome)
    - [ ] パフォーマンス測定・改善

### Phase 7: 将来拡張準備

- [ ] Push通知基盤
    - [ ] Push notification permission 
    - [ ] Service Worker push event 処理
    - [ ] 通知管理UI作成
    - [ ] バックエンド通知送信API (将来実装)

- [ ] Background Sync
    - [ ] オフライン時のデータ保存
    - [ ] Background sync event処理  
    - [ ] 同期状況のユーザー表示
    - [ ] エラーハンドリング

## PWA要件チェックリスト

### 基本要件
- [ ] HTTPS配信 (localhost除く)
- [ ] Web App Manifest
- [ ] Service Worker (fetchイベント必須)  
- [ ] レスポンシブデザイン
- [ ] 200応答のstart_url

### 推奨要件
- [ ] オフライン機能
- [ ] インストール可能
- [ ] Fast loading (3秒以内)
- [ ] Cross-browser対応
- [ ] Accessible design

## 対象ファイル

### 新規作成
- `public/manifest.json`
- `public/sw.js`
- `public/icons/` (各種アイコンファイル)
- `src/components/pwa/InstallButton.tsx`
- `src/components/pwa/OfflineIndicator.tsx`
- `src/hooks/usePWA.ts`

### 修正対象
- `next.config.js` (PWA設定)
- `src/app/layout.tsx` (manifest、meta tags)
- `src/app/globals.css` (PWA用スタイル)
- `package.json` (PWA関連依存関係)

## 技術的考慮事項

- **iOS Safari制限**: iOS PWAの機能制限への対応策
- **キャッシュサイズ**: モバイル端末のストレージ制限考慮
- **更新戦略**: Service Worker、キャッシュの更新タイミング
- **セキュリティ**: HTTPS必須、CSP設定