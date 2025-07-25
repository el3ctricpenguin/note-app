# 開発手順

## Git ワークフロー
```bash
# 機能開発
git checkout main
git pull origin main
git checkout -b feat/feature-name
# 開発作業
git add .
git commit -m "feat: 新機能追加"
git push origin feat/feature-name

# リファクタリング
git checkout main
git pull origin main
git checkout -b refactor/refactor-name
# リファクタリング作業
```

## テスト手順
```bash
# 1. リント・型チェック
npm run lint
npm run build

# 2. 機能テスト
npm run dev
# ブラウザで動作確認:
# - 認証フロー (サインイン・サインアップ・サインアウト)
# - 映画管理 (追加・編集・削除・一覧)  
# - TODO管理 (追加・完了切替・削除)
# - 日付別映画表示

# 3. データベース確認
npx prisma studio
```

## デプロイ手順
```bash
# 1. プロダクションビルド
npm run build

# 2. マイグレーション
npx prisma migrate deploy

# 3. サーバー起動/再起動
pm2 restart note-app

# 4. 動作確認
curl http://localhost:3000/api/health
```

## リファクタリング手順
1. **現状分析**: 行数カウント・重複確認
2. **共通化**: ユーティリティ関数作成
3. **統合**: API・コンポーネントの重複除去
4. **テスト**: 全機能の動作確認
5. **計測**: 削減効果の確認

## 緊急時対応
```bash
# ロールバック
git checkout main
pm2 restart note-app

# ログ確認
pm2 logs note-app
tail -f /var/log/postgresql/postgresql.log
```