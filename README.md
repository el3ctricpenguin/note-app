# note-app

## 導入方法

git cloneと依存関係のインストール

```
git clone git@github.com:el3ctricpenguin/note-app.git
cd note-app
npm i
```

### 開発時

```
npm run dev
```

### デプロイ時

envファイルの作成

```
nano .env.production
```

Next.jsのビルドと起動

```
npm run build
npm start
```

PM2を使用したプロセス管理

```
sudo npm install -g pm2

# アプリケーションの起動
pm2 start npm --name "note-app" -- start

# PM2をシステム起動時に自動起動するよう設定
pm2 startup systemd

# 設定を保存
pm2 save
```

(localhost:3000にポートフォワーディング設定を行う)

### PostgreSQLの導入

インストール

```
sudo apt install postgresql postgresql-contrib
```

サービスの開始・有効化

```
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

新しいデータベースユーザーの作成

```
psql

CREATE USER noteapp;
CREATE USER noteapp WITH PASSWORD 'password';
ALTER USER noteapp CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE noteapp TO noteapp;

\q
```

PostgreSQLの設定ファイルの編集 (ローカル接続のみ許可)

```
sudo nano /etc/postgresql/<version>/main/postgresql.conf
```

migration

```
npx prisma migrate dev --name init
```

サーバーの実行 (DBを試す)

```
npm start
```

## 更新方法

サービスの停止

```
pm2 stop note-app
```

再ビルド

```
npm run build
```

DBのmigration (必要であれば)

```
npx prisma migrate deploy
```

サービスの開始

```
pm2 start note-app
```
