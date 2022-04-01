<script lang="ts">
  import * as styles from './index.css';
  import Text from '$lib/components/Text/index.svelte';
  import CardGear from '$lib/components/CardGear/index.svelte';
  import { units } from '$lib/db/units';

  import * as R from 'remeda';

  export let stageData: {
    stage: number;
    data: any;
    enemy: {
      unitCnt: number;
      unitId: number;
    }[];
    drop: any;
    bestGear: any;
  };

  let enemies = R.pathOr(stageData, ['enemy'], []).map((enemy) => {
    const unit = units.find((unit) => unit.id === enemy.unitId);
    return {
      ...enemy,
      ...unit,
      hp:
        unit.hp *
        (stageData.data.hp + stageData.data.hp_inc * (stageData.stage - stageData.data.lv)),
      atk:
        unit.atk *
        (stageData.data.atk + stageData.data.atk_inc * (stageData.stage - stageData.data.lv)),
      def:
        unit.def *
        (stageData.data.def + stageData.data.def_inc * (stageData.stage - stageData.data.lv)),
    };
  });

  let shouldShowHeroGear =
    Boolean(stageData?.bestGear?.hero?.full) && Boolean(stageData?.drop?.hero);
  let shouldShowArcherGear =
    Boolean(stageData?.bestGear?.archer?.full) && Boolean(stageData?.drop?.archer);
</script>

<div class={styles.flex}>
  <div>
    <Text fontSize="2xl">{stageData.stage}</Text>
  </div>
  <div class={styles.details}>
    {#each enemies as enemy}
      {#if enemy.unitCnt !== 1}
        <img loading="lazy" src={`images/enemies/enemy${enemy.unitId}.png`} alt="enemy" />
      {/if}
    {/each}
    <div class={styles.drop}>
      {#if shouldShowHeroGear}
        <CardGear
          width={14}
          gearType={{
            type: 'hero',
            equip: stageData.drop.hero,
            rarity: stageData.bestGear.hero.rarity,
            level: stageData.bestGear.hero.level,
          }}
        />
      {/if}
      {#if shouldShowArcherGear}
        <CardGear
          width={14}
          gearType={{
            type: 'blueprint',
            equip: stageData.drop.archer,
            rarity: stageData.bestGear.archer.rarity,
            level: stageData.bestGear.archer.level,
          }}
        />
      {/if}
    </div>
  </div>
</div>
