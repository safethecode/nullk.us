import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/content/posts";
import { MdxContent } from "@/ui/mdx-content";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  return {
    title: `${post.title} - nullk.us`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-12 sm:px-8 lg:py-16">
      <article>
        <Link
          className="mb-10 inline-flex text-[13px] text-neutral-400 transition-colors hover:text-neutral-900"
          href="/"
        >
          목록으로
        </Link>

        <header className="mb-12 border-neutral-100 border-b pb-8">
          <h1 className="mb-4 font-bold text-[2.25rem] text-neutral-900 leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-neutral-400">
            <time dateTime={post.date}>{post.date}</time>
          </div>
          {post.description && (
            <p className="mt-4 text-[15px] text-neutral-500 leading-7">
              {post.description}
            </p>
          )}
        </header>

        <MdxContent source={post.body} />
      </article>
    </main>
  );
}
