// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';
// 2. Import loader(s)
import { glob } from 'astro/loaders';
// 3. Import Zod
import { z } from 'astro/zod';

// loader 用來讀取指定 content 底下所有 .md 檔案
// schema 用來定義 content collection 每篇 md frontmatter 必須有哪些欄位
const newsCategories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news-categories' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    publishDate: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string().optional(),
  }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    image: z.string(),
  }),
});

// 最後要匯出所有 collections
export const collections = { news, artists, newsCategories };
