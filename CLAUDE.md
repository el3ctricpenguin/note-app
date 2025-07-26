# Claude Code メモ

## 起動時のチェック

```bash
# 最新の作業記録を確認（ここに進捗が書かれている）
ls claude/notes/ | tail -1

# 進行中タスクの確認
ls claude/tasks/in-progress/
```

## Claude Docsフォルダ構成

```
claude/
├── notes/          # 日付別作業記録 → 毎セッション作成・更新
├── tasks/          # タスク管理 (todo/in-progress/done) → タスク状態変化時
├── context.md      # プロジェクト概要 → 技術スタック・機能変更時
├── codebase.md     # コード構造 → ディレクトリ構成・アーキテクチャ変更時
├── commands.md     # コマンド集 → 新しいコマンド追加時
└── workflows.md    # 開発手順 → 開発プロセス変更時
```

## 進捗管理ルール

- **すべての進捗**: `claude/notes/YYYY-MM-DD-*.md` に記録

## 記録ルール

**重要**: 作業中は常に進捗を記録し続ける

### 「記録して」と言われた時

- **CLAUDE.md** または **claude/ フォルダ内**の適切なファイルに書く
- 内容に応じてファイルを選択（技術的内容→対応するmdファイル、進捗→notes/）

### 継続的な記録

- 作業開始時: 必ず記録を確認・更新
- 作業中: 進捗やタスク状態変化を随時記録
- 完了時: 最終状態を記録

## PR前の更新ルール

PR出す前に claude/ 内の全ファイルを最新状態に更新する

## プロジェクト

映画管理・TODO管理アプリ (Next.js + TypeScript)

- 現在: 2,289行 → 目標: 1,375-1,602行 (30-40%削減)
- **メインブランチ**: `main`

## コマンド

```bash
npm run dev    # 開発
npm run build  # ビルド
npm run lint   # リント

# 行数カウント
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l
```
