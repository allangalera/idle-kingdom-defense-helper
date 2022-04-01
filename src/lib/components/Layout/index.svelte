<script>
  import * as styles from './index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  export let theme;
</script>

<div
  class={[
    styles.container,
    theme,
    sprinkles({
      background: 'gray1',
    }),
  ].join(' ')}
>
  <slot />
</div>
