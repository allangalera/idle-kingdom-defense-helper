<script lang="ts">
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { heroes } from '$lib/db/heroes';
  import * as R from 'remeda';

  import * as styles from './index.css';

  export let heroRank;

  const getHeroData = (heroName: string) => {
    return heroes.find((hero) => hero.name === heroName);
  };
</script>

<div class={styles.container}>
  {#each heroRank as row, rowIndex}
    {#each row as item, i}
      {#if R.isString(item)}
        <CardHero hero={getHeroData(item)} />
      {:else if Boolean(item?.title)}
        <div
          class={[
            styles.titleContainerVariant[`rank${rowIndex}`],
            styles.columnVariant[item?.double ? 'double' : 'default'],
          ].join(' ')}
        >
          <Text as="span" fontSize="sm" textAlign="center" color="black" fontWeight="bold"
            >{item.value}</Text
          >
        </div>
      {:else}
        <div />
      {/if}
    {/each}
  {/each}
</div>
