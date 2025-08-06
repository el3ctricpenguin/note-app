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

## タスク管理ルール

### タスク状態管理
- **新規タスク**: `claude/tasks/todo/`
- **作業中**: `claude/tasks/in-progress/`
- **完了**: `claude/tasks/done/` (完了時に移動)

### ファイル移動
```bash
# 完了時の移動例
mv claude/tasks/in-progress/TASK_NAME.md claude/tasks/done/
```

### チェックリスト更新ルール
- **タスク完了時**: TaskのMarkdownを更新 (どんな小さなタスクでも更新)
- **完了タスク**: 必ずdoneフォルダに移動してからコミット

## コード品質管理ワークフロー (必須)

### 品質管理手順
```bash
# 1. ビルドチェック
npm run build

# 2. フォーマット
npx prettier --write [変更したファイルパス]

# 3. リント
npm run lint
```

### 実行タイミング
- **必須順序**: build → Prettier → lint → コミット
- **TypeScript**: エラー完全解消後のみコミット許可
- **例外なし**: どんな小さな変更でも実行

## Git ワークフロー

```bash
# 機能開発・リファクタリング
git checkout main
git pull origin main
git checkout -b refactor/feature-name
# 開発作業
git add .
git commit -m "refactor: 変更内容"
git push origin refactor/feature-name
```

## 記録・更新ルール

### 記録タイミング
- **すべての進捗**: `claude/notes/YYYY-MM-DD-*.md` に記録
- **作業開始時**: 必ず記録確認・更新
- **PR前**: claude/ 内の全ファイルを最新状態に更新

### 「記録して」と言われた時
- **CLAUDE.md** または **claude/ フォルダ内**の適切なファイルに書く
- 内容に応じてファイルを選択（技術的内容→対応するmdファイル、進捗→notes/）

## 開発時の注意点

### ライブラリ・依存関係
- **新規ライブラリ導入**: 既存(Chakra-UI)で解決できないか必ず確認
- **一貫性保持**: 既存のアイコン・コンポーネント使用を優先

### 型安全性
- **any型発見**: 必ず厳密な型に置き換え
- **TypeScript**: エラー0件を維持