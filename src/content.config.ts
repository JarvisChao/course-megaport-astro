import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// schema 用來定義 content collection 每篇 md frontmatter 的資料格式
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
    title: z.string(),
    image: z.string(),
  }),
});

export const collections = { news, artists, newsCategories };
