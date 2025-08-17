import { join } from "node:path/win32";
import { h1 } from "./i2.ts";
import { dateformat } from "./dateformat.ts";

const a: string = "a";
console.log(join("A", "B"));
await new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1);
});
console.log(dateformat(new Date(), "yyyy-MM-dd(ddd)HH:mm:ss.SSS"));
console.log(h1);
console.log(`fetch response:${await fetch("https://example.com").then(a => a.status)}`);
console.log("ts-nodeでの処理全部完了");

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it("add", () => {
    expect(1).toBe(1); // toBe は同じインスタンス
    expect({}).toEqual({}); // toEqual は同じインターフェイス＆値
  })
}
