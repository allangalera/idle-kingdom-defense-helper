<script lang="ts">
  import * as styles from './index.css';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let checked = false;

  $: dispatch('toggle', { checked });

  function onChange() {
    checked = !checked;
  }

  function onKeyUp(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      checked = !checked;
    }
  }
</script>

<label>
  <input class={styles.input} type="checkbox" on:change on:change={onChange} {checked} />
  <span
    class={styles.containerVariant[checked ? 'checked' : 'notchecked']}
    aria-hidden
    tabindex="0"
    on:keyup={onKeyUp}><span class={styles.ballVariant[checked ? 'right' : 'left']} /></span
  >
</label>
