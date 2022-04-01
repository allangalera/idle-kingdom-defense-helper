<script lang="ts">
  import * as styles from './index.css';
  import { createEventDispatcher } from 'svelte';
  import CardGear from '$lib/components/CardGear/index.svelte';
  const dispatch = createEventDispatcher();

  export let checked = false;
  export let gearType: CardGearType;

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
    <CardGear {gearType} width={20} />
  </div>
</label>
