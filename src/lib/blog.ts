// ─────────────────────────────────────────────────────────────────────────
// lib/blog.ts — biblioteka do czytania artykułów blogowych z Markdown.
// gray-matter parsuje frontmatter (--- ... ---), remark/remark-html
// konwertuje treść markdown na HTML (z obsługą GFM — tabele, lists,
// itp.). Funkcje: getAllSlugs(), getAllPosts(), getPostBySlug().
// Wywoływane przy buildzie (SSG) — zero runtime'u w produkcji.
// ─────────────────────────────────────────────────────────────────────────
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

// Lista slug'ów wszystkich artykułów (= nazwy plików .md bez rozszerzenia).
// Używane w generateStaticParams oraz w sitemap.ts.
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

// Wszystkie artykuły zsortowane od najnowszego (wg pola `date` w frontmatter).
// Zwraca tylko frontmatter — bez treści HTML (lżejsze, dla listings).
export function getAllPosts(): BlogFrontmatter[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8');
      const { data } = matter(raw);
      return { ...(data as BlogFrontmatter), slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Pełny artykuł po slug — frontmatter + treść skompilowana do HTML.
// Używane przez /blog/[slug]/page.tsx do renderingu pojedynczego artykułu.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
  return {
    ...(data as BlogFrontmatter),
    slug,
    contentHtml: processed.toString(),
  };
}
