<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';

  import * as styles from './index.css';

  export let tier = 'c';

  let selectedTier = tier;

  const tiers = {
    c: '/images/heroTier/iconGearQuality1.png',
    b: '/images/heroTier/iconGearQuality2.png',
    a: '/images/heroTier/iconGearQuality3.png',
    s: '/images/heroTier/iconGearQuality4.png',
  };

  const onSelect = (tier) => {
    selectedTier = tier;
  };
</script>

<div>
  <div class={styles.rarityContainer}>
    {#each Object.keys(tiers) as tier}
      <Button variant="logic" on:click={() => onSelect(tier)}>
        <img
          loading="lazy"
          class={styles.imageVariant[selectedTier === tier ? 'default' : 'disabled']}
          src={tiers[tier]}
          alt={`Tier ${tier} icon`}
        />
      </Button>
    {/each}
  </div>
</div>
