<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';
</script>

<table
  class={concatClasses(
    styles.table,
    sprinkles({
      marginY: 4,
    })
  )}
  cellspacing="0"
>
  <slot />
</table>
