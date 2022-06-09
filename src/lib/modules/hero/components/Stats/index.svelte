<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import type { HeroType } from '$lib/db/heroes';
  import { Attributes } from '$lib/enums';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { returnAttributeName } from '$lib/utils/hero';

  import * as styles from './index.css';

  export let heroStats: Partial<HeroType>;

  const attributesOrder = [
    Attributes.hp,
    Attributes.atk,
    Attributes.def,
    Attributes.cri,
    Attributes.criDamage,
    Attributes.criResist,
    Attributes.criDamageResist,
    Attributes.dodge,
    Attributes.hit,
    Attributes.defPierce,
    Attributes.defPierceResist,
    Attributes.atkSpeed,
    Attributes.moveSpeed,
  ];
</script>

<GridItem title="Stats">
  {#each attributesOrder as attr}
    <div class={styles.heroStat}>
      <Text>{returnAttributeName(attr)}:</Text>
      <Text>{heroStats[attr].toLocaleString()}</Text>
    </div>
  {/each}
</GridItem>
