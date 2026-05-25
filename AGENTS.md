# AGENTS.md

AI エージェントがこのリポジトリで作業する際のルールです。

## 基本方針

- `index.html` は依存ライブラリなしの純粋な HTML/CSS/JS を維持する
- 既存機能（タスク追加・完了トグル・削除・localStorage 保存）を壊さない
- 390px 幅のスマホで読みやすいレイアウトを維持する
- コミットは日本語でも英語でもよい、ただし内容を明確に書く

## ブランチ運用

- 作業は `claude/` プレフィックスのブランチで行う
- main への直接プッシュはしない
- PR を作成して main にマージする

## テスト

```bash
npm install
npm test
```

変更後は必ずテストを通す。UI に影響する変更は `tests/app.test.mjs` にテストを追加する。

## デプロイ

main へのマージ後、GitHub Actions が自動で GitHub Pages にデプロイする。
デプロイ完了後に `https://keigoodpp.github.io/codex-demo/` で確認する。

## やってはいけないこと

- `node_modules/` をコミットする
- `.env` ファイルを作成・コミットする
- 外部 CDN への依存を追加する（オフライン動作を維持するため）
- テストを削除・スキップする
