import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string;             // ISO date
  updated?: string;
  author: string;
  category: 'guide' | 'industry' | 'seasonal' | 'pricing';
  keywords: string[];
  readMinutes: number;
  pillar?: boolean;        // pillar article gets cross-linked from clusters
  related?: string[];      // related blog slugs
  faqs?: { q: string; a: string }[];
}

export interface BlogPost extends BlogFrontmatter {
  contentHtml: string;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPosts(): BlogFrontmatter[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8');
      const { data } = matter(raw);
      return { ...(data as BlogFrontmatter), slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return {
    ...(data as BlogFrontmatter),
    slug,
    contentHtml: processed.toString(),
  };
}
