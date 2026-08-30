import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateGridLayout } from "./grid-layout.ts";

test("screenshot-sized grid contains only complete cards", () => {
  assert.deepEqual(calculateGridLayout(246, 781), {
    cardSize: 42.8,
    columns: 5,
    rows: 14,
    tileCount: 70,
  });
});
