<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import * as styles from './index.css';

  export let onCloseOnOverlay: () => void = () => void 0;

  onMount(() => {
    document.body.style.overflow = 'hidden';
  });

  onDestroy(() => {
    document.body.style.overflow = '';
  });
</script>

<div class={styles.wrapper} on:click={onCloseOnOverlay}>
  <slot />
</div>
