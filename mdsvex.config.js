import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import slug from 'remark-slug';
import toc from 'remark-toc';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [toc, slug],
  rehypePlugins: [],
  layout: './src/lib/modules/mdx/layout/index.svelte',
});

export default config;
