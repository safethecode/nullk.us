import Link from "next/link";
import type { ReactNode } from "react";

interface MdxContentProps {
  source: string;
}

type Block =
  | { children: string[]; type: "list" }
  | { code: string; language: string; type: "code" }
  | { level: 1 | 2 | 3; text: string; type: "heading" }
  | { text: string; type: "paragraph" };

export function MdxContent({ source }: MdxContentProps) {
  const blocks = parseBlocks(source);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${block.level}` as const;

          return (
            <Heading
              className="pt-4 font-semibold text-neutral-900 text-xl tracking-tight first:pt-0"
              key={`${block.type}-${index}`}
            >
              {block.text}
            </Heading>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              className="space-y-2 text-[15px] text-neutral-500 leading-7"
              key={`${block.type}-${index}`}
            >
              {block.children.map((child) => (
                <li className="flex gap-3" key={child}>
                  <span className="mt-[11px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                  <span>{renderInline(child)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              className="overflow-x-auto rounded-lg border border-neutral-100 bg-neutral-50 p-4 text-[13px] text-neutral-600"
              key={`${block.type}-${index}`}
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <p
            className="text-[16px] text-neutral-500 leading-8"
            key={`${block.type}-${index}`}
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function parseBlocks(source: string) {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let codeLanguage = "";
  let isInCodeBlock = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({ text: paragraph.join(" "), type: "paragraph" });
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) {
      return;
    }

    blocks.push({ children: list, type: "list" });
    list = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (isInCodeBlock) {
        blocks.push({
          code: code.join("\n"),
          language: codeLanguage,
          type: "code",
        });
        code = [];
        codeLanguage = "";
        isInCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        codeLanguage = line.replace("```", "").trim();
        isInCodeBlock = true;
      }
      continue;
    }

    if (isInCodeBlock) {
      code.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);

    if (heading) {
      const marker = heading[1];
      const text = heading[2];

      if (!marker || !text) {
        continue;
      }

      flushParagraph();
      flushList();
      blocks.push({
        level: marker.length as 1 | 2 | 3,
        text,
        type: "heading",
      });
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);

    if (listItem) {
      const text = listItem[1];

      if (!text) {
        continue;
      }

      flushParagraph();
      list.push(text);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  if (isInCodeBlock || code.length > 0) {
    blocks.push({ code: code.join("\n"), language: codeLanguage, type: "code" });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("`")) {
      parts.push(
        <code
          className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em] text-neutral-700"
          key={`${token}-${match.index}`}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (link?.[1] && link[2]) {
        parts.push(
          <Link
            className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-500"
            href={link[2]}
            key={`${token}-${match.index}`}
          >
            {link[1]}
          </Link>
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
