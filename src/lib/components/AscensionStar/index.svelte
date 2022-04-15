<script lang="ts">
  import * as styles from './index.css';
  import { createEventDispatcher } from 'svelte';

  export let selected;
  export let ascensionLevel = 0;

  const startLevels = [
    'images/icons/iconStarBig1.png',
    'images/icons/iconStarBig2.png',
    'images/icons/iconStarBig3.png',
    'images/icons/iconStarBig4.png',
    'images/icons/iconStarBig5.png',
    'images/icons/iconStarBig6.png',
  ];

  const dispatch = createEventDispatcher();

  $: dispatch('selected', { selected });

  function onChange() {
    selected = !selected;
  }
</script>

<div class={styles.button} role="button" on:click on:click={onChange}>
  {#if selected}
    <img loading="lazy" src={startLevels[ascensionLevel]} alt="start level" />
  {:else}
    <img loading="lazy" class={styles.fade} src={startLevels[ascensionLevel]} alt="start level" />
  {/if}
</div>
