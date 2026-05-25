import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

function createDOM() {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    url: "http://localhost",
  });
  return dom;
}

describe("タスクの初期表示", () => {
  test("デフォルトタスクが3件表示される", () => {
    const { window } = createDOM();
    const items = window.document.querySelectorAll("#taskList li");
    assert.equal(items.length, 3);
  });

  test("最初のタスクは完了済み", () => {
    const { window } = createDOM();
    const first = window.document.querySelector("#taskList li");
    assert.ok(first.classList.contains("done"));
  });
});

describe("タスクの追加", () => {
  let window, input, form, list;

  beforeEach(() => {
    ({ window } = createDOM());
    input = window.document.querySelector("#taskInput");
    form = window.document.querySelector("#taskForm");
    list = window.document.querySelector("#taskList");
  });

  test("テキストを入力してsubmitするとタスクが増える", () => {
    const before = list.querySelectorAll("li").length;
    input.value = "新しいタスク";
    form.dispatchEvent(new window.Event("submit"));
    assert.equal(list.querySelectorAll("li").length, before + 1);
  });

  test("追加したタスクはリスト先頭に来る", () => {
    input.value = "先頭タスク";
    form.dispatchEvent(new window.Event("submit"));
    const first = list.querySelector("li span");
    assert.equal(first.textContent, "先頭タスク");
  });

  test("空白のみのタスクは追加されない", () => {
    const before = list.querySelectorAll("li").length;
    input.value = "   ";
    form.dispatchEvent(new window.Event("submit"));
    assert.equal(list.querySelectorAll("li").length, before);
  });
});

describe("タスクの完了トグル", () => {
  test("済ボタンを押すと完了状態になる", () => {
    const { window } = createDOM();
    const list = window.document.querySelector("#taskList");
    const secondItem = list.querySelectorAll("li")[1];
    assert.ok(!secondItem.classList.contains("done"));

    const toggleBtn = secondItem.querySelector("button");
    toggleBtn.dispatchEvent(new window.MouseEvent("click"));

    const updated = list.querySelectorAll("li")[1];
    assert.ok(updated.classList.contains("done"));
  });
});

describe("タスクの削除", () => {
  test("削ボタンを押すとタスクが1件減る", () => {
    const { window } = createDOM();
    const list = window.document.querySelector("#taskList");
    const before = list.querySelectorAll("li").length;

    const deleteBtn = list.querySelector("li .actions button:last-child");
    deleteBtn.dispatchEvent(new window.MouseEvent("click"));

    assert.equal(list.querySelectorAll("li").length, before - 1);
  });
});

describe("localStorage 永続化", () => {
  test("タスク追加後にlocalStorageへ保存される", () => {
    const { window } = createDOM();
    const input = window.document.querySelector("#taskInput");
    const form = window.document.querySelector("#taskForm");

    input.value = "保存テスト";
    form.dispatchEvent(new window.Event("submit"));

    const saved = JSON.parse(window.localStorage.getItem("codex-demo-tasks"));
    assert.ok(saved.some((t) => t.text === "保存テスト"));
  });
});
