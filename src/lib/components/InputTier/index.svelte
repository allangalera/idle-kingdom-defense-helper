<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';

  import * as styles from './index.css';

  export let value = '0';
  export let size: Sprinkles['width'] = 8;

  const tiers = {
    '0': '/images/heroTier/iconGearQuality1.png',
    '1': '/images/heroTier/iconGearQuality2.png',
    '2': '/images/heroTier/iconGearQuality3.png',
    '3': '/images/heroTier/iconGearQuality4.png',
  };

  const onSelect = (tier) => {
    value = tier;
  };
</script>

<div>
  <div class={styles.rarityContainer}>
    {#each Object.keys(tiers) as tier}
      <Button variant="logic" on:click={() => onSelect(tier)}>
        <img
          loading="lazy"
          class={concatClasses(
            styles.imageVariant[value === tier ? 'default' : 'disabled'],
            sprinkles({
              width: size,
              height: size,
            })
          )}
          src={tiers[tier]}
          alt={`Tier ${tier} icon`}
        />
      </Button>
    {/each}
  </div>
</div>
