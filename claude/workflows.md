# 開発手順

## ⚠️ 重要: Claude Code作業スタイル

### 必須の作業姿勢

- **簡潔な回答**: 4行以内、必要最小限の情報のみ
- **継続実行**: ユーザーへの確認や指示を必要としない場合は確認せず継続実行
- **TodoWrite活用**: 複数ステップの作業は必ずTodoListで管理

### 禁止事項

- 不要な前置き・後置き・説明
- 実行前の確認や許可取り
- 冗長なコメントや要約

### 編集許可ルール

- **自由編集可**: `claude/notes/`, `claude/tasks/` 内のファイル
- **許可必須**: その他のclaudeフォルダ内ファイル（context.md, codebase.md, workflows.md等）編集時は事前許可を求める

### ファイル編集手順

- **Prettier実行**: 編集後は必ずPrettier実行

## 進捗管理・記録ルール

### 記録タイミング

- **すべての進捗**: `claude/notes/YYYY-MM-DD-*.md` に記録
- **作業開始時**: 必ず記録確認・更新
- **作業中**: 進捗やタスク状態変化を随時記録
- **完了時**: 最終状態を記録

### 「記録して」と言われた時

- **CLAUDE.md** または **claude/ フォルダ内**の適切なファイルに書く
- 内容に応じてファイルを選択（技術的内容→対応するmdファイル、進捗→notes/）

## タスク管理ルール

### タスク状態管理

- **新規タスク**: `claude/tasks/todo/` (計画段階・未着手)
- **作業中**: `claude/tasks/in-progress/` (実際に作業開始時に移動)
- **完了**: `claude/tasks/done/` (完了時に移動)

### タスクファイル作成ルール

- **必ずtodo/から開始**: 新規タスクは`claude/tasks/todo/`に作成
- **作業開始時の手順**:
    1. ブランチ作成: `git checkout -b {feat,fix,refactor}/task-name`
    2. タスクファイル移動: `mv claude/tasks/todo/TASK.md claude/tasks/in-progress/`

### ファイル移動（必ず相対パス使用）

```bash
# 作業開始時
mv claude/tasks/todo/TASK_NAME.md claude/tasks/in-progress/

# 完了時の移動例
mv claude/tasks/in-progress/TASK_NAME.md claude/tasks/done/

# ❌ 絶対パスは使用禁止（長すぎて読みにくい）
```

## PR前の更新ルール

PR出す前に claude/ 内の全ファイルを最新状態に更新する

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

### PR作成ルール

- **言語**: PRタイトル・本文は日本語で記述
- **テンプレート**: 概要のみ記載

### コミットメッセージルール

- **言語**: コミットメッセージは英語で記述

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

## コード品質管理ワークフロー (必須)

### 品質管理手順

```bash
npx prettier --write [変更したファイルパス]
```

```bash
npm run lint
```

### 実行タイミング

- **ファイル編集後**: 即座にPrettier実行 (保存時に毎回必須)
- **コミット前**: 必ずlint実行 (エラーがないことを確認してからコミット)
- **例外なし**: どんな小さな変更でも実行

## タスク管理ワークフロー (必須)

### チェックリスト更新ルール

- **タスク完了時**: TaskのMarkdownを更新 (どんな小さなタスクでも更新)
- **チェックボックス必須**: すべてのタスクリストは `- [ ]` 形式を使用
- **完了マーク**: `- [x]` で完了を示す

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
