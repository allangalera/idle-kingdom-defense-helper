import { sprinkles } from '$lib/styles/sprinkles.css';
import { theme } from '$lib/styles/themes/index.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  borderWidth: theme.sizes.px,
  borderStyle: 'solid',
  borderColor: theme.themeColors.border.default,
  borderRadius: theme.border.radii.lg,
  display: 'flex',
  // gap: theme.sizes[4],
  overflow: 'hidden',
  background: theme.themeColors.baseColors.gray3,
  justifyContent: 'space-between',
});

export const leftContainer = style({
  display: 'flex',
  flex: 1,
  padding: theme.space[4],
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  gap: theme.space[2],
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const kingdomName = style({
  borderStyle: 'solid',
  borderWidth: theme.sizes.px,
  borderRadius: theme.border.radii.lg,
  minWidth: theme.sizes[14],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const rewardIcons = style({
  width: theme.sizes[4],
  height: 'auto',
});

export const rewardsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes[2],
});

export const rewardsItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.sizes[2],
});

export const rewardInfo = style({
  flex: 1,
});

export const fortInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[2],
});

export const fortContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(5, ${theme.space[5]})`,
  gap: theme.space[0.5],
});

export const fortItem = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.border.radii.lg,
  background: theme.themeColors.baseColors.gray9,
  aspectRatio: '1/1',
});

export const fortItemVariant = styleVariants({
  dontHave: [fortItem],
  have: [
    fortItem,
    {
      background: theme.themeColors.baseColors.green9,
    },
  ],
});

export const fortTextContainerVariant = styleVariants({
  dontHave: [
    {
      visibility: 'hidden',
    },
  ],
  have: [],
});

export const rightContainer = style({
  display: 'flex',
  flexDirection: 'column',
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
