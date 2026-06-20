export interface CommandPostInput {
  date: string;
  description: string;
  slug: string;
  title: string;
}

export interface PostCommandItem {
  date: string;
  href: string;
  keywords: string[];
  slug: string;
  title: string;
  value: string;
}

export function createPostCommandItems(posts: CommandPostInput[]) {
  return posts.map((post): PostCommandItem => {
    return {
      date: post.date,
      href: `/posts/${post.slug}`,
      keywords: [post.description, post.date, post.slug].filter(Boolean),
      slug: post.slug,
      title: post.title,
      value: `${post.title} ${post.slug}`,
    };
  });
}
