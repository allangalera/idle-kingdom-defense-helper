<script lang="ts">
  import CardBorder from '$lib/components/CardBorder/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { convertGradeToStarLevel } from '$lib/utils';
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let value: number;
  export let grade: number = null;
  export let width: Sprinkles['width'] = 24;

  let valueSize = match(width, [[(n) => n < 20, 'sm' as const], (x) => 'xl' as const]);
  let shardSize = match(width, [[(n) => n < 20, 3 as const], (x) => 4 as const]);
  let heroGrade;

  let conditionalAttributes = {};

  $: heroGrade = convertGradeToStarLevel(grade ?? 1);
  $: conditionalAttributes = grade ? heroGrade : {};
</script>

<CardBorder {width} {...conditionalAttributes}>
  <div class={styles.container}>
    <img
      loading="lazy"
      class={styles.background}
      src="images/rarity/bgRarity1.png"
      alt="Shard Card Background"
    />
    <img
      loading="lazy"
      class={[
        styles.iconShard,
        sprinkles({
          width: shardSize,
        }),
      ].join(' ')}
      src="images/icons/iconPiece.png"
      alt="Icon Piece Shard"
    />
    <div class={styles.question}>
      <Text color="white" fontSize="3xl">?</Text>
    </div>
    <div class={styles.counter}>
      <Text color="white" fontSize={valueSize}>x{value}</Text>
    </div>
  </div>
</CardBorder>
