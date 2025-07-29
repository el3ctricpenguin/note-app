# コード構造

## ディレクトリ構成
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (298行)
│   │   ├── (auth)/        # 認証API
│   │   ├── film/          # 映画管理API
│   │   └── todo/          # TODO API
│   ├── film/              # 映画関連ページ
│   ├── todo/              # TODOページ
│   └── sign-*/            # 認証ページ
├── components/            # 再利用コンポーネント (770行)
│   ├── cards/            # カード系UI
│   ├── modals/           # モーダル (517行 - 最大削減対象)
│   ├── layout/           # レイアウト
│   └── form/             # フォーム
├── hooks/                # カスタムフック
├── config/               # 設定 (189行)
│   └── theme/            # Chakra UIテーマ (184行)
├── lib/                  # ユーティリティ (53行)
├── types/                # 型定義 (5行)
└── features/             # 機能別ユーティリティ (15行)
```

## 重複・削減対象コード
1. **APIエラーハンドリング**: 10ファイルで同じパターン
2. **認証スキーマ**: sign-in/sign-upで同一
3. **モーダルロジック**: 3ファイルで類似処理
4. **データベースクエリ**: CRUD操作の重複
5. **Chakra UIテーマ**: 未使用設定多数

## コーディング規約
- TypeScript strict mode
- ESLint (Next.js設定)
- Prettier設定済み
- **絶対パス必須**: 全てのインポートで `@/` を使用
- hooksは `src/hooks/` に配置
- **作業完了後必須**: 変更ファイルにPrettier/ESLint実行