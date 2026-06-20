import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

test("home page renders up to 13 posts", async () => {
  const source = await readFile(
    new URL("./page.tsx", import.meta.url),
    "utf8"
  );

  assert.match(source, /posts\.slice\(0,\s*13\)/);
});
