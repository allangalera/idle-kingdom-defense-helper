<script lang="ts">
  import * as styles from './index.css';

  export let onCloseOnOverlay: () => void = () => void 0;
</script>

<div class={styles.wrapper} on:click={onCloseOnOverlay}>
  <slot />
</div>
