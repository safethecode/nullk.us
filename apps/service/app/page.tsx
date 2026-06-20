import Link from "next/link";
import { createPostCommandItems } from "@/lib/content/command-items";
import { getAllPosts } from "@/lib/content/posts";
import { ContentCommandMenu } from "@/ui/content-command-menu";

export default async function Home() {
  const posts = await getAllPosts();
  const visiblePosts = posts.slice(0, 13);
  const commandItems = createPostCommandItems(posts);

  return (
    <main className="mx-auto min-h-[calc(100svh-4rem)] w-full max-w-208 px-6 py-10 sm:px-8 lg:py-14">
      <section>
        <ContentCommandMenu items={commandItems} />

        <div className="overflow-hidden border-neutral-50 border-y">
          {visiblePosts.map((post) => (
            <Link
              className="group grid min-h-4 grid-cols-[minmax(0,1fr)] items-center gap-2 border-neutral-50 border-b px-1 py-4 transition-colors last:border-b-0 hover:bg-neutral-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-4"
              href={`/posts/${post.slug}`}
              key={post.slug}
            >
              <span className="truncate text-base text-neutral-500 leading-tight transition-colors group-hover:text-neutral-900 sm:text-base">
                {post.title}
              </span>
              <time
                className="text-sm text-neutral-300 leading-tight sm:text-right sm:text-sm"
                dateTime={post.date}
              >
                {post.date}
              </time>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
