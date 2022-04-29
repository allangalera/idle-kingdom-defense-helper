<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';
</script>

<div
  class={[
    styles.container,
    sprinkles({
      display: {
        sm: 'none',
        xl: 'flex',
      },
      flexDirection: 'column',
    }),
  ].join(' ')}
>
  <slot />
</div>
