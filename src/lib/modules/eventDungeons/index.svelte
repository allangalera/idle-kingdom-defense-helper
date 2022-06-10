<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Heading from '$lib/components/Text/index.svelte';
  import { eventDungeons } from '$lib/db/event-dungeons';
  import { shopConst } from '$lib/db/shop';
  import { stage } from '$lib/shared/stores/user/stage';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import * as tableStyles from '$lib/styles/table.css';
  import { returnRewardDataByStage } from '$lib/utils/stage';
  import { paramCase } from 'change-case';
  import { match } from 'oxide.ts';
  import { onMount } from 'svelte';

  import * as styles from './index.css';

  const getRewardValue = (stage, reward) => {
    const stageReward = returnRewardDataByStage(stage);
    return match(reward.t, [
      [
        24,
        () => {
          const init = stageReward.idle.evolve.init;
          const inc = stageReward.idle.evolve.inc;
          const dLv = Math.max(0, stage - stageReward.idle.lv);
          const tic = Math.floor((reward.h * 60 * 60) / 300);
          return (init + dLv * inc) * tic;
        },
      ],
      [
        27,
        () => {
          const init = stageReward.idle.soulInit;
          const inc = stageReward.idle.soulInc;
          const dLv = Math.max(0, stage - stageReward.idle.lv);
          const tic =
            Math.floor((reward.h * 60 * 60) / 5) *
            (1 + shopConst.EFFECTOR_DATA_IDLE_SOUL.slice(-1)[0]);
          return (init + dLv * inc) * tic;
        },
      ],
      [
        31,
        () => {
          const init = stageReward.idle.hscroll.init;
          const inc = stageReward.idle.hscroll.inc;
          const dLv = Math.max(0, stage - stageReward.idle.lv);
          const tic = Math.floor((reward.h * 60 * 60) / 300);
          return (init + dLv * inc) * tic;
        },
      ],
      [
        102,
        () => {
          const init = stageReward.idle.goldInit;
          const inc = stageReward.idle.goldInc;
          const dLv = Math.max(0, stage - stageReward.idle.lv);
          const tic =
            Math.floor((reward.h * 60 * 60) / 5) *
            (1 + shopConst.EFFECTOR_DATA_IDLE_GOLD.slice(-1)[0]);
          return (init + dLv * inc) * tic;
        },
      ],
      [
        201,
        () => {
          return reward.c;
        },
      ],
      () => 0,
    ]);
  };

  const getRowStyling = (row: number, highlight = false) => {
    if (highlight) return 'highlight';
    return match(row, [[(n) => Boolean(n % 2), 'row'], () => 'otherRow']);
  };

  const getHighlightedStages = (userCurrentStage) => {
    let highlights = {};
    for (const dungeon of Object.keys(eventDungeons)) {
      let highlightedLevel = 1;
      for (const level of eventDungeons[dungeon]) {
        if (userCurrentStage > level.unlockStage) highlightedLevel = level.lv;
      }
      highlights[dungeon] = highlightedLevel;
    }
    return highlights;
  };

  onMount(() => {
    const selector = `#${paramCase(Object.keys(eventDungeons)[0])}-current-stage > div:first-child`;
    const currentStage = document.querySelector(selector);
    if (currentStage) {
      setTimeout(() => {
        currentStage.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 1000);
    }
  });

  $: highlightedLv = getHighlightedStages($stage.stage);
</script>

<Heading fontSize="3xl" textAlign="center">Event Dungeon Rewards</Heading>
<Text textAlign="center"
  >All data considers the max bonus from Ruby Shop that influences gold and soulsone values</Text
>

<div class={styles.grid}>
  {#each Object.keys(eventDungeons) as dungeon}
    <GridItem title={dungeon}>
      <div class={tableStyles.table3Columns}>
        <div class={tableStyles.tableRow}>
          <div class={tableStyles.tableHeaderItem}>
            <Heading textAlign="center">Level</Heading>
          </div>
          <div class={tableStyles.tableHeaderItem}>
            <Heading textAlign="center">Stage Unlock</Heading>
          </div>
          <div class={tableStyles.tableHeaderItem}>
            <Heading textAlign="center">Reward</Heading>
          </div>
        </div>
        {#each eventDungeons[dungeon] as item, i}
          <div
            class={tableStyles.tableRowVariant[
              getRowStyling(i, highlightedLv[dungeon] === item.lv)
            ]}
            {...highlightedLv[dungeon] === item.lv && { id: `${paramCase(dungeon)}-current-stage` }}
          >
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{item.lv}</Text>
            </div>
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{item.unlockStage}</Text>
            </div>
            <div class={tableStyles.tableItem}>
              <div
                class={sprinkles({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
              >
                {#if dungeon === 'Gold Mine'}
                  <Card
                    cardType="coin"
                    width={16}
                    value={getRewardValue(item.difficultyStage, item.rewards[0])}
                  />
                  <Card
                    cardType="ascension-stone"
                    width={16}
                    value={getRewardValue(item.difficultyStage, item.rewards[1])}
                  />
                {:else if dungeon === "Specter's Ruins"}
                  <Card
                    width={16}
                    cardType="soulstone"
                    value={getRewardValue(item.difficultyStage, item.rewards[0])}
                  />
                  <Card
                    cardType="ascension-stone"
                    width={16}
                    value={getRewardValue(item.difficultyStage, item.rewards[1])}
                  />
                {:else}
                  <Card
                    width={16}
                    cardType="hero-seal"
                    value={getRewardValue(item.difficultyStage, item.rewards[0])}
                  />
                  <CardHeroShard width={16} value={item.rewards[1].c} grade={item.rewards[1].gr} />
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </GridItem>
  {/each}
</div>
