# codex-demo

スマホから AI エージェントへ開発タスクを投げる実験場です。

## 目的

- スマホだけで「今日の実験」「次の指示」「完了条件」を管理する
- Claude Code などの AI エージェントに指示を投げて、結果を確認する
- 実験ログを GitHub 上に残す

## 使い方

1. `https://keigoodpp.github.io/codex-demo/` をスマホで開く
2. 「今日の実験」「次に投げる指示」「完了条件」を記入する
3. タスクリストで進捗を管理する
4. AI エージェントに指示を投げる（[TASK_TEMPLATE.md](./TASK_TEMPLATE.md) を参照）
5. 結果を確認して完了条件と照合する

## ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | 実験管理 UI（依存なし・静的） |
| `AGENTS.md` | AI エージェント向けの作業ルール |
| `TASK_TEMPLATE.md` | タスク依頼テンプレート |
| `.github/workflows/deploy.yml` | main push で GitHub Pages に自動デプロイ |
| `tests/app.test.mjs` | jsdom による機能テスト |

## ローカルで動かす

```bash
# ブラウザで直接開くだけで動く
open index.html

# テスト実行
npm install
npm test
```

## デプロイ

main ブランチへの push で GitHub Pages に自動デプロイされます。
