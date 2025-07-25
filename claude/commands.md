# よく使うコマンド

## 開発
```bash
npm run dev          # 開発サーバー (port 3005)
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー
npm run lint         # ESLint実行
```

## データベース
```bash
npx prisma studio           # DB管理画面
npx prisma migrate dev      # 開発マイグレーション
npx prisma migrate deploy   # プロダクションマイグレーション
npx prisma generate         # クライアント生成
```

## 分析・デバッグ
```bash
# 行数カウント
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l

# ファイル数確認
find src -name "*.ts" -o -name "*.tsx" | wc -l

# 最新のgitログ
git log --oneline -10

# ブランチ確認
git branch -a
```

## テーマ関連
```bash
# Chakra UIテーマ生成
npm run theme
```

## デプロイ (サーバー)
```bash
# プロダクション環境変数設定
nano .env.production

# PM2でプロセス管理
pm2 start npm --name "note-app" -- start
pm2 restart note-app
pm2 stop note-app
pm2 logs note-app
```