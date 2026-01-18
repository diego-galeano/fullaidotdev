import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        title: 'fullai.dev Blog',
        description: 'Insights on AI strategy, engineering, and software development from the fullai.dev team.',
        site: context.site || 'https://fullai.dev',
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            categories: post.data.tags,
            author: post.data.author,
            customData: `<language>${post.data.lang}</language>`,
        })),
        customData: `<language>en</language>`,
    });
}
