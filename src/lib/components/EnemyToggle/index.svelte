<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import * as styles from './index.css';

  const dispatch = createEventDispatcher();

  export let checked = false;
  export let enemyId;

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

  function onKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
    }
  }
</script>

<label>
  <input class={styles.input} type="checkbox" on:change on:change={onChange} {checked} />
  <div
    class={styles.containerVariant[checked ? 'checked' : 'notchecked']}
    aria-hidden
    tabindex="0"
    on:keyup={onKeyUp}
    on:keydown={onKeyDown}
  >
    <img loading="lazy" src={`images/enemies/enemy${enemyId}.png`} alt={enemyId.toString()} />
  </div>
</label>
