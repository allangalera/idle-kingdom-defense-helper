import { theme } from "$lib/styles/themes/index.css";
import { style } from "@vanilla-extract/css";

export const liBefore = style({
    '::before': {
        color: theme.themeColors.baseColors.gray12,
        content: "•",
        display: "inline-block",
        width: "1em",
        marginLeft: "-1em"
    }
})