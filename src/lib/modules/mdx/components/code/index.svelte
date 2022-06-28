<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';
</script>

<code
  class={concatClasses(
    styles.code,
    sprinkles({
      background: 'gray7',
      padding: 1,
    })
  )}><slot /></code
>
