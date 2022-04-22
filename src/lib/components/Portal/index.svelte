<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import * as styles from './index.css';

  let ref;
  let portal;
  const mainDiv = document.querySelector('body > div');

  onMount(() => {
    portal = document.createElement('div');
    mainDiv.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    mainDiv.removeChild(portal);
  });
</script>

<div class={styles.container}>
  <div bind:this={ref}>
    <slot />
  </div>
</div>
