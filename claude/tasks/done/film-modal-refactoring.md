# FilmModal.tsx リファクタリング

## 概要

273行の巨大なFilmModal.tsxを複数の小さな再利用可能コンポーネントに分割し、保守性とテスタビリティを向上させる。

## 目標

- 273行 → 約50行に削減
- 再利用可能な編集コンポーネント群作成
- 型安全性の向上
- WatchedFields と WatchlistFields の適切な分離

## タスク一覧

### Phase 1: 再利用可能な基盤コンポーネント作成

- [ ] `EditableTextAreaField.tsx` - 複数行テキスト編集用の再利用可能コンポーネント作成（isEditableプロパティで表示専用も対応）
- [ ] `EditableDateField.tsx` - 日付編集用の再利用可能コンポーネント作成（isEditableプロパティで表示専用も対応）
- [ ] `EditableCheckboxField.tsx` - チェックボックス編集用の再利用可能コンポーネント作成（isEditableプロパティで表示専用も対応）
- [ ] `EditableRatingField.tsx` - 評価編集用コンポーネント作成（FilmRatingEditableを活用）（isEditableプロパティで表示専用も対応）

**注意:** 各EditableFieldコンポーネントには`isEditable`プロパティを追加し、falseの場合は表示専用モードとする。これにより追加日などの読み取り専用フィールドも同じコンポーネントで対応可能。

### Phase 2: 専用フィールド群コンポーネント作成

- [ ] `WatchedFields.tsx` - 視聴済み映画用フィールド群（視聴日・評価・メモ）
- [ ] `WatchlistFields.tsx` - ウォッチリスト用フィールド群（追加日・おすすめ元・視聴済み・メモ）

### Phase 3: 統合・完成

- [ ] `FilmModal.tsx` リファクタリング - 新しいコンポーネントを使用して大幅簡素化
- [ ] 型定義の強化 - any型を削除して厳密な型定義を追加
- [ ] 動作確認とテスト - 全ての編集フィールドが正常に動作することを確認
- [ ] コード品質チェック - Prettier・ESLint実行

## ファイル配置

```
src/components/
├── form/
│   ├── EditableTextAreaField.tsx    # 新規（isEditableプロパティ付き）
│   ├── EditableDateField.tsx       # 新規（isEditableプロパティ付き）
│   ├── EditableCheckboxField.tsx   # 新規
│   └── EditableRatingField.tsx     # 新規
└── modals/
    ├── FilmModal.tsx               # リファクタリング
    └── parts/
        ├── FilmModalHeader.tsx     # 既存（移動）
        ├── WatchedFields.tsx       # 新規
        └── WatchlistFields.tsx     # 新規
```

## 期待される成果

- コード削減: 273行 → 約50行
- 保守性向上: 小さな責任を持つコンポーネント群
- 再利用性: 他のモーダルでも使える編集コンポーネント
- テスタビリティ: 独立してテスト可能な小さなコンポーネント
- 型安全性: any型の削除と厳密な型定義

## 開始日

2025-08-06
