import { ol } from '$lib/modules/mdx/components/ol/index.css';
import { ul } from '$lib/modules/mdx/components/ul/index.css';
import { theme } from '$lib/styles/themes/index.css';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const paragraph = style({
  wordBreak: 'break-word',
  selectors: {
    [`${ul} &`]: {
      marginBottom: calc.negate(theme.space[1]),
    },
    [`${ol} &`]: {
      marginBottom: calc.negate(theme.space[1]),
    },
  },
});
