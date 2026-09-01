import assert from "node:assert/strict";
import { test } from "node:test";
import robots from "./app/robots.ts";
import nextConfig from "./next.config.js";

test("people assets send an instruction that prevents image indexing", async () => {
  assert.equal(typeof nextConfig.headers, "function");

  const rules = await nextConfig.headers();
  const peopleAssets = rules.find(
    (rule) => rule.source === "/assets/people/:path*"
  );

  assert.ok(peopleAssets);
  assert.deepEqual(peopleAssets.headers, [
    {
      key: "X-Robots-Tag",
      value: "noindex, noarchive",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-origin",
    },
  ]);
});

test("Google image crawler cannot crawl the people asset directory", () => {
  const manifest = robots();
  const googleImageRule = manifest.rules.find(
    (rule) => rule.userAgent === "Googlebot-Image"
  );

  assert.ok(googleImageRule);
  assert.equal(googleImageRule.disallow, "/assets/people/");
});
