import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface Post {
  body: string;
  date: string;
  description: string;
  slug: string;
  title: string;
}

interface ParsedFrontmatter {
  body: string;
  data: Record<string, string>;
}

const appPostsDirectory = path.join(process.cwd(), "content", "posts");
const workspacePostsDirectory = path.join(
  process.cwd(),
  "apps",
  "service",
  "content",
  "posts"
);

export function getPostsDirectory() {
  return existsSync(appPostsDirectory)
    ? appPostsDirectory
    : workspacePostsDirectory;
}

export async function readPosts(directory = getPostsDirectory()) {
  const entries = await readdir(directory, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.mdx$/, "");
        const source = await readFile(path.join(directory, entry.name), "utf8");
        const parsed = parseFrontmatter(source);

        return normalizePost(slug, parsed);
      })
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllPosts() {
  return readPosts();
}

export async function getPostBySlug(
  slug: string,
  directory = getPostsDirectory()
) {
  const posts = await readPosts(directory);

  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostSlugs(directory = getPostsDirectory()) {
  const posts = await readPosts(directory);

  return posts.map((post) => post.slug);
}

function normalizePost(slug: string, parsed: ParsedFrontmatter): Post {
  const title = parsed.data.title;
  const date = parsed.data.date;

  if (!title) {
    throw new Error(`Post "${slug}" is missing title frontmatter`);
  }

  if (!date) {
    throw new Error(`Post "${slug}" is missing date frontmatter`);
  }

  return {
    body: parsed.body.trim(),
    date,
    description: parsed.data.description ?? "",
    slug,
    title,
  };
}

function parseFrontmatter(source: string): ParsedFrontmatter {
  if (!source.startsWith("---\n")) {
    return { body: source, data: {} };
  }

  const endIndex = source.indexOf("\n---", 4);

  if (endIndex === -1) {
    return { body: source, data: {} };
  }

  const frontmatter = source.slice(4, endIndex);
  const body = source.slice(endIndex + 4).replace(/^\n/, "");
  const data = Object.fromEntries(
    frontmatter
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^["']|["']$/g, "");

        return [key, value];
      })
  );

  return { body, data };
}
