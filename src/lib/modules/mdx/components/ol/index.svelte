<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';
</script>

<ol
  class={concatClasses(
    styles.ol,
    sprinkles({
      color: 'gray12',
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'tall',
    })
  )}
>
  <slot />
</ol>
