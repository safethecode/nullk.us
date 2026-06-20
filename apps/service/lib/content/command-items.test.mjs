import assert from "node:assert/strict";
import test from "node:test";

import { createPostCommandItems } from "./command-items.ts";

test("createPostCommandItems maps posts into stable cmdk items", () => {
  const items = createPostCommandItems([
    {
      date: "2026-06-19",
      description: "Recent writing",
      slug: "i-prefer-cli",
      title: "I prefer CLI",
    },
  ]);

  assert.deepEqual(items, [
    {
      date: "2026-06-19",
      href: "/posts/i-prefer-cli",
      keywords: ["Recent writing", "2026-06-19", "i-prefer-cli"],
      slug: "i-prefer-cli",
      title: "I prefer CLI",
      value: "I prefer CLI i-prefer-cli",
    },
  ]);
});
