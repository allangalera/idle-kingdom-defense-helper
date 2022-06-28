<script lang="ts">
  import * as styles from './index.css';

  export let src;
  export let alt;
</script>

<div class={styles.container}>
  <img class={styles.img} {src} {alt} title={alt} />
</div>
