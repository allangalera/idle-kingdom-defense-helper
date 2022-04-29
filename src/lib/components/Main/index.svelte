<script lang="ts">
  import Footer from '$lib/components/Footer/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';

  import * as styles from './index.css';
</script>

<main
  class={[
    styles.container,
    sprinkles({
      background: 'gray1',
      padding: {
        sm: 4,
        md: 6,
      },
      flex: 1,
    }),
  ].join(' ')}
>
  <div class={styles.wrapper}>
    <slot />
    <Footer />
  </div>
</main>
