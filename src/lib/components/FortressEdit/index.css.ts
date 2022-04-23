import { sprinkles } from '$lib/styles/sprinkles.css';
import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.lg,
  display: 'flex',
  // alignItems: 'center',
  gap: theme.sizes[4],
  overflow: 'hidden',
  background: theme.themeColors.baseColors.gray3,
  justifyContent: 'space-between',
});

export const actionContainer = style({
  display: 'flex',
});

export const actionButton = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.space[2],
  cursor: 'pointer',
});

export const actionButtonVariant = styleVariants({
  success: [
    actionButton,
    {
      background: theme.themeColors.baseColors.green9,
    },
  ],
  primary: [
    actionButton,
    sprinkles({
      background: {
        lightMode: 'gray9',
        darkMode: 'gray7',
      },
    }),
  ],
  danger: [
    actionButton,
    {
      background: theme.themeColors.baseColors.red9,
    },
  ],
});

export const buttonIcons = style({
  width: theme.sizes[4],
  height: theme.sizes[4],
});

export const name = style({
  paddingLeft: theme.space[2],
  alignSelf: 'center',
});

export const icon = style({
  width: theme.sizes[5],
  height: theme.sizes[5],
});

export const center = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  gap: theme.space[2],
});

export const centerVariant = styleVariants({
  show: [center],
  hide: [
    center,
    {
      visibility: 'hidden',
    },
  ],
});

export const rewards = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
});

export const level = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  minWidth: 'max-content',
  gap: theme.space[2],
});
