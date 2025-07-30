# Claude Code メモ

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

## ⚠️ 重要: セッション開始時の必須チェック

**新セッション開始時は必ずこの手順を実行する**

```bash
# 1. claude/以下のnotes, tasks以外の全ファイルを読む（必須）

# 2. 最新の作業記録を確認
ls claude/notes/ | tail -1

# 3. 進行中タスクの確認
ls claude/tasks/in-progress/
```

## ⚠️ 重要: 詳細は claude/workflows.md を参照

## プロジェクト

映画管理・TODO管理アプリ (Next.js + TypeScript)
- **メインブランチ**: `main`
