<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import CardGear from '$lib/components/CardGear/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Tooltip from '$lib/components/Tooltip/index.svelte';
  import { units } from '$lib/db/units';
  import { convertGradeToStarLevel, getIdleKingdomNumberFormat } from '$lib/utils';
  import { returnRewardDataByStage } from '$lib/utils/stage';
  import * as R from 'remeda';

  import * as styles from './index.css';

  export let stageData: {
    stage: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    enemy: {
      unitCnt: number;
      unitId: number;
    }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bestGear: any;
  };

  let rewardData = returnRewardDataByStage(stageData.stage);

  let enemies = R.pathOr(stageData, ['enemy'], []).map((enemy) => {
    const unit = units.find((unit) => unit.id === enemy.unitId);
    return {
      ...enemy,
      ...unit,
      hp:
        unit.hp *
        (stageData.data[`${enemy.unitType === 6 ? 'b_' : ''}hp`] +
          stageData.data[`${enemy.unitType === 6 ? 'b_' : ''}hp_inc`] *
            (stageData.stage - stageData.data.lv)),
      atk:
        unit.atk *
        (stageData.data.atk + stageData.data.atk_inc * (stageData.stage - stageData.data.lv)),
      def:
        unit.def *
        (stageData.data.def + stageData.data.def_inc * (stageData.stage - stageData.data.lv)),
    };
  });

  let bestArcherGear =
    stageData?.bestGear.archer && convertGradeToStarLevel(stageData?.bestGear.archer);
  let bestHeroGear = stageData?.bestGear.hero && convertGradeToStarLevel(stageData?.bestGear.hero);

  let shouldShowHeroGear = Boolean(bestHeroGear);
  let shouldShowArcherGear = Boolean(bestArcherGear);
</script>

<div class={styles.flex}>
  <div class={styles.info}>
    <Text fontSize="2xl">{stageData.stage}</Text>
  </div>
  <div class={styles.details}>
    {#each enemies as enemy}
      {#if enemy.unitType === 5}
        <Tooltip>
          <img loading="lazy" src={`images/enemies/enemy${enemy.unitId}.png`} alt="enemy" />
          <svelte:fragment slot="tooltip-content">
            <div class={styles.tooltipGrid}>
              <Text>HP</Text>
              <Text textAlign="center">{getIdleKingdomNumberFormat(enemy.hp)}</Text>
              <Text>ATK:</Text>
              <Text textAlign="center">{getIdleKingdomNumberFormat(enemy.atk)}</Text>
              <Text>DEF:</Text>
              <Text textAlign="center">{getIdleKingdomNumberFormat(enemy.def)}</Text>
              <Text>Count:</Text>
              <Text textAlign="center">{enemy.unitCnt}</Text>
            </div>
          </svelte:fragment>
        </Tooltip>
      {/if}
    {/each}
    <div class={styles.drop}>
      {#if shouldShowHeroGear}
        <CardGear
          width={14}
          gearType={{
            type: 'hero',
            equip: stageData.drop.hero,
            rarity: bestHeroGear.rarity,
            level: bestHeroGear.level,
          }}
        />
      {/if}
      {#if shouldShowArcherGear}
        <CardGear
          width={14}
          gearType={{
            type: 'blueprint',
            equip: stageData.drop.archer,
            rarity: bestArcherGear.rarity,
            level: bestArcherGear.level,
          }}
        />
      {/if}
      <Card
        cardType="ascension-stone"
        width={14}
        value={rewardData.idle.evolve.init +
          rewardData.idle.evolve.inc * (stageData.stage - rewardData.idle.lv)}
      />
      <Card
        cardType="hero-seal"
        width={14}
        value={rewardData.idle.hscroll.init +
          rewardData.idle.hscroll.inc * (stageData.stage - rewardData.idle.lv)}
      />
      <Card
        cardType="gear-seal"
        width={14}
        value={rewardData.idle.rscroll.init +
          rewardData.idle.rscroll.inc * (stageData.stage - rewardData.idle.lv)}
      />
      <Card
        cardType="rune-seal"
        width={14}
        value={rewardData.idle.runescroll.init +
          rewardData.idle.runescroll.inc * (stageData.stage - rewardData.idle.lv)}
      />
      <Card
        cardType="coin"
        width={14}
        value={(rewardData.idle.goldInit +
          rewardData.idle.goldInc * (stageData.stage - rewardData.idle.lv)) *
          60}
      />
      <Card
        cardType="soulstone"
        width={14}
        value={(rewardData.idle.soulInit +
          rewardData.idle.soulInc * (stageData.stage - rewardData.idle.lv)) *
          60}
      />
    </div>
  </div>
</div>
