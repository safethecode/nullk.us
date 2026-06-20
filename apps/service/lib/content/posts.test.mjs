import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { getPostBySlug, readPosts } from "./posts.ts";

test("readPosts returns published mdx posts sorted newest first", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "content-posts-"));

  try {
    await writeFile(
      path.join(directory, "older.mdx"),
      [
        "---",
        'title: "Older post"',
        'date: "2026-04-18"',
        'description: "Earlier writing"',
        "---",
        "",
        "Older body.",
      ].join("\n")
    );
    await writeFile(
      path.join(directory, "newer.mdx"),
      [
        "---",
        'title: "Newer post"',
        'date: "2026-06-19"',
        'description: "Recent writing"',
        "---",
        "",
        "# Newer body",
      ].join("\n")
    );
    await writeFile(path.join(directory, "notes.txt"), "ignore me");

    const posts = await readPosts(directory);

    assert.deepEqual(
      posts.map((post) => ({
        body: post.body.trim(),
        description: post.description,
        date: post.date,
        slug: post.slug,
        title: post.title,
      })),
      [
        {
          body: "# Newer body",
          description: "Recent writing",
          date: "2026-06-19",
          slug: "newer",
          title: "Newer post",
        },
        {
          body: "Older body.",
          description: "Earlier writing",
          date: "2026-04-18",
          slug: "older",
          title: "Older post",
        },
      ]
    );
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test("getPostBySlug returns one post from a directory", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "content-post-"));

  try {
    await writeFile(
      path.join(directory, "hello.mdx"),
      [
        "---",
        'title: "Hello"',
        'date: "2026-06-20"',
        "---",
        "",
        "Hello body.",
      ].join("\n")
    );

    const post = await getPostBySlug("hello", directory);

    assert.equal(post?.slug, "hello");
    assert.equal(post?.title, "Hello");
    assert.equal(post?.body.trim(), "Hello body.");
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});
