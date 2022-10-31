<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';
</script>

<ul
  class={concatClasses(
    styles.ul,
    sprinkles({
      color: 'gray12',
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'tall',
    })
  )}
>
  <slot />
</ul>
